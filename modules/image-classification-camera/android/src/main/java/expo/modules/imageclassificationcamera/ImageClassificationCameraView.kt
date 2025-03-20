package expo.modules.imageclassificationcamera

import android.annotation.SuppressLint
import android.content.Context
import android.content.res.Configuration
import android.graphics.Bitmap
import android.hardware.camera2.CaptureRequest
import android.util.Log
import android.util.Size
import android.view.Display
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.camera2.interop.Camera2Interop
import androidx.camera.core.Camera
import androidx.camera.core.CameraInfo
import androidx.camera.core.CameraSelector
import androidx.camera.core.CameraState
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.core.resolutionselector.ResolutionSelector
import androidx.camera.core.resolutionselector.ResolutionStrategy
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import expo.modules.core.errors.ModuleDestroyedException
import expo.modules.imageclassificationcamera.helpers.ImageClassifierHelper
import expo.modules.imageclassificationcamera.records.CameraRatio
import expo.modules.imageclassificationcamera.records.CameraType
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import org.tensorflow.lite.task.vision.classifier.Classifications
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import kotlin.properties.Delegates


@SuppressLint("ViewConstructor")
class ImageClassificationCameraView(
  context: Context,
  appContext: AppContext
) : ExpoView(context, appContext), ImageClassifierHelper.ClassifierListener {

  companion object {
    private const val TAG = "Image Classifier"
  }

  private val currentActivity
    get() = appContext.throwingActivity as AppCompatActivity

  private lateinit var imageClassifierHelper: ImageClassifierHelper
  private lateinit var bitmapBuffer: Bitmap

  var camera: Camera? = null
  private var cameraProvider: ProcessCameraProvider? = null
  private val providerFuture = ProcessCameraProvider.getInstance(context)
  private var imageAnalyzer: ImageAnalysis? = null
  private lateinit var cameraExecutor: ExecutorService

  private var previewView = PreviewView(context).apply {
    elevation = 0f
  }
  private val scope = CoroutineScope(Dispatchers.Main)
  private var shouldCreateCamera = false
  private var previewPaused = false

  var lensFacing = CameraType.BACK
    set(value) {
      field = value
      shouldCreateCamera = true
    }

  var ratio: CameraRatio? = null
    set(value) {
      field = value
      shouldCreateCamera = true
    }

  var pictureSize: String = ""
    set(value) {
      field = value
      shouldCreateCamera = true
    }

  var enableTorch: Boolean by Delegates.observable(false) { _, _, newValue ->
    setTorchEnabled(newValue)
  }

  private var lastWidth = 0
  private var lastHeight = 0

  private val onCameraReady by EventDispatcher<Unit>()
  private val onClassificationResult by EventDispatcher<Map<String,String>>()
  private val onClassificationError by EventDispatcher<String>()
  private val analysisInterval:Long = 1000
  private var lastAnalyzedTimestamp:Long = 0

  /**
     * We want every distinct barcode to be reported to the JS listener.
     * If we return some static value as a coalescing key there may be two barcode events
     * containing two different barcodes waiting to be transmitted to JS
     * that would get coalesced (because both of them would have the same coalescing key).
     * So let's differentiate them with a hash of the contents (mod short's max value).
     */

  // Scanning-related properties

  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    measureChild(previewView, widthMeasureSpec, heightMeasureSpec)

    setMeasuredDimension(
      ViewGroup.resolveSize(previewView.measuredWidth, widthMeasureSpec),
      ViewGroup.resolveSize(previewView.measuredHeight, heightMeasureSpec)
    )
  }

  override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
    val width = right - left
    val height = bottom - top
    if (width != lastWidth || height != lastHeight) {
      previewView.layout(0, 0, width, height)
      lastWidth = width
      lastHeight = height
    }
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    imageAnalyzer?.targetRotation = previewView.display.rotation
  }

  override fun onViewAdded(child: View?) {
    super.onViewAdded(child)
    if (child == previewView) {
      imageClassifierHelper = ImageClassifierHelper(context = context, imageClassifierListener = this)
      cameraExecutor = Executors.newSingleThreadExecutor()
      return
    }
    child?.bringToFront()
    removeView(previewView)
    addView(previewView, 0)
  }

  private fun setTorchEnabled(enabled: Boolean) {
    if (camera?.cameraInfo?.hasFlashUnit() == true) {
      camera?.cameraControl?.enableTorch(enabled)
    }
  }

  @SuppressLint("UnsafeOptInUsageError")
  fun createCamera() {
    if (!shouldCreateCamera || previewPaused) {
      return
    }
    shouldCreateCamera = false
    providerFuture.addListener(
      {
        val cameraProvider: ProcessCameraProvider = providerFuture.get()

        ratio?.let {
          previewView.scaleType =
            if (ratio == CameraRatio.FOUR_THREE || ratio == CameraRatio.SIXTEEN_NINE) {
              PreviewView.ScaleType.FIT_CENTER
            } else {
              PreviewView.ScaleType.FILL_CENTER
            }
        }

        val resolutionSelector = buildResolutionSelector()
        val preview = Preview.Builder()
          .setResolutionSelector(resolutionSelector)
          .build()
          .also {
            it.surfaceProvider = previewView.surfaceProvider
          }

        imageAnalyzer =
          ImageAnalysis.Builder()
            .setResolutionSelector(resolutionSelector)
            .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
            .setOutputImageFormat(ImageAnalysis.OUTPUT_IMAGE_FORMAT_RGBA_8888)
            .build()
            // The analyzer can then be assigned to the instance
            .also {
              it.setAnalyzer(cameraExecutor) { image ->
                val currentTimestamp = System.currentTimeMillis()
                if (currentTimestamp - lastAnalyzedTimestamp >= analysisInterval) {
                  lastAnalyzedTimestamp = currentTimestamp;

                  if (!::bitmapBuffer.isInitialized) {
                    // The image rotation and RGB image buffer are initialized only once
                    // the analyzer has started running
                    bitmapBuffer = Bitmap.createBitmap(
                      image.width,
                      image.height,
                      Bitmap.Config.ARGB_8888
                    )
                  }
                  classifyImage(image)
                }
                image.close();
              }
            }

        val cameraSelector = CameraSelector.Builder()
          .requireLensFacing(lensFacing.mapToCharacteristic())
          .build()

        try {
          cameraProvider.unbindAll()
          camera = cameraProvider.bindToLifecycle(currentActivity, cameraSelector, preview, imageAnalyzer)
          camera?.let {
            observeCameraState(it.cameraInfo)
          }
          this.cameraProvider = cameraProvider
        } catch (_: Exception) {
          Log.i("Camera","Camera component could not be rendered - is there any other instance running?")
         
        }
      },
      ContextCompat.getMainExecutor(context)
    )
  }
  
  private fun buildResolutionSelector(): ResolutionSelector {
    val strategy = if (pictureSize.isNotEmpty()) {
      val size = parseSizeSafely(pictureSize)
      size?.let {
        ResolutionStrategy(size, ResolutionStrategy.FALLBACK_RULE_CLOSEST_LOWER_THEN_HIGHER)
      } ?: ResolutionStrategy.HIGHEST_AVAILABLE_STRATEGY
    } else {
      ResolutionStrategy.HIGHEST_AVAILABLE_STRATEGY
    }

    return if (ratio == CameraRatio.ONE_ONE) {
      ResolutionSelector.Builder().setResolutionFilter { supportedSizes, _ ->
        return@setResolutionFilter supportedSizes.filter {
          it.width == it.height
        }
      }.setResolutionStrategy(strategy).build()
    } else {
      ResolutionSelector.Builder().apply {
        ratio?.let {
          setAspectRatioStrategy(it.mapToStrategy())
        }
        setResolutionStrategy(strategy)
      }.build()
    }
  }

  private fun parseSizeSafely(size: String): Size? {
    val pattern = Regex("\\d+x\\d+")
    if (!pattern.matches(size)) {
      return null
    }

    return try {
      Size.parseSize(size)
    } catch (e: Throwable) {
      null
    }
  }

  private fun observeCameraState(cameraInfo: CameraInfo) {
    cameraInfo.cameraState.observe(currentActivity) {
      when (it.type) {
        CameraState.Type.OPEN -> {
          onCameraReady(Unit)
          setTorchEnabled(enableTorch)
        }

        else -> {}
      }
    }
  }

  fun resumePreview() {
    shouldCreateCamera = true
    previewPaused = false
    createCamera()
  }

  fun pausePreview() {
    previewPaused = true
    cameraProvider?.unbindAll()
  }

  init {
    previewView.setOnHierarchyChangeListener(object : OnHierarchyChangeListener {
      override fun onChildViewRemoved(parent: View?, child: View?) = Unit
      override fun onChildViewAdded(parent: View?, child: View?) {
        parent?.measure(
          MeasureSpec.makeMeasureSpec(measuredWidth, MeasureSpec.EXACTLY),
          MeasureSpec.makeMeasureSpec(measuredHeight, MeasureSpec.EXACTLY)
        )
        parent?.layout(0, 0, parent.measuredWidth, parent.measuredHeight)
      }
    })
    addView(
      previewView,
      ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT
      )
    )
  }

  private fun cancelCoroutineScope() = try {
    scope.cancel(ModuleDestroyedException())
  } catch (e: Exception) {
    Log.e("CameraViewModule", "The scope does not have a job in it")
  }

  private fun classifyImage(image: ImageProxy) {
    // Copy out RGB bits to the shared bitmap buffer
    image.use { bitmapBuffer.copyPixelsFromBuffer(image.planes[0].buffer) }

    // Pass Bitmap and rotation to the image classifier helper for processing and classification
    imageClassifierHelper.classify(bitmapBuffer, getScreenOrientation())
  }

  private fun getScreenOrientation() : Int {
    //val outMetrics = DisplayMetrics()

    val display: Display?
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.R) {
      display = currentActivity.display
      //display?.getRealMetrics(outMetrics)
    } else {
      @Suppress("DEPRECATION")
      display = currentActivity.windowManager.defaultDisplay
      //@Suppress("DEPRECATION")
      //display.getMetrics(outMetrics)
    }

    return display?.rotation ?: 0
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    cancelCoroutineScope()
    cameraProvider?.unbindAll()
    cameraExecutor.shutdown()
    lastAnalyzedTimestamp = 0
  }

  override fun onError(error: String) {
    Log.e(TAG,error)
    onClassificationError(error)
  }
  override fun onResults(results: List<Classifications>?, inferenceTime: Long) {
    Log.i(TAG,"onResults" + results.toString())
    results?.let { it ->
      if (it.isEmpty() || it[0].categories.isEmpty()) return

      val sortedCategories = it[0].categories.sortedBy { it?.index }
      val category = sortedCategories[0]
      onClassificationResult(mapOf("label" to category.label, "score" to category.score.toString()))
    }
  }
}