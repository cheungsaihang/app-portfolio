package expo.modules.imageclassificationcamera

import android.Manifest
import android.util.Log
import expo.modules.imageclassificationcamera.records.CameraType
import expo.modules.imageclassificationcamera.records.FlashMode
import expo.modules.core.errors.ModuleDestroyedException
import expo.modules.interfaces.permissions.Permissions
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.functions.Queues
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import java.io.File

val cameraEvents = arrayOf(
  "onCameraReady",
  "onMountError",
  "onClassificationResult",
  "onClassificationError"
)

class ImageClassificationCameraModule : Module() {
  private val moduleScope = CoroutineScope(Dispatchers.Main)

  override fun definition() = ModuleDefinition {
    Name("ImageClassificationCamera")


    AsyncFunction("requestCameraPermissionsAsync") { promise: Promise ->
      Permissions.askForPermissionsWithPermissionsManager(
        permissionsManager,
        promise,
        Manifest.permission.CAMERA
      )
    }

    AsyncFunction("getCameraPermissionsAsync") { promise: Promise ->
      Permissions.getPermissionsWithPermissionsManager(
        permissionsManager,
        promise,
        Manifest.permission.CAMERA
      )
    }

    OnDestroy {
      try {
        moduleScope.cancel(ModuleDestroyedException())
      } catch (_: IllegalStateException) {
        Log.e(TAG, "The scope does not have a job in it")
      }
    }

    View(ImageClassificationCameraView::class) {
      Events(cameraEvents)

      // Prop("zoom") { view, zoom: Float? ->
      //   zoom?.let {
      //     if (view.zoom != it) {
      //       view.zoom = it
      //     }
      //   } ?: run {
      //     if (view.zoom != 0f) {
      //       view.zoom = 0f
      //     }
      //   }
      // }

      OnViewDidUpdateProps { view ->
        Log.i(TAG,"OnViewDidUpdateProps")
        view.resumePreview()
      }

      AsyncFunction("resumePreview") { view: ImageClassificationCameraView ->
        view.resumePreview()
      }

      AsyncFunction("pausePreview") { view: ImageClassificationCameraView ->
        view.pausePreview()
      }
    }
  }

  private val permissionsManager: Permissions
    get() = appContext.permissions ?: throw Exceptions.PermissionsModuleNotFound()

  companion object {
    internal val TAG = ImageClassificationCameraModule::class.java.simpleName
  }
}