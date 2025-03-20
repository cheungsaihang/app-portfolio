package expo.modules.imageclassificationcamera.records

import android.hardware.camera2.CameraMetadata
import androidx.camera.core.ImageCapture
import expo.modules.kotlin.types.Enumerable
import androidx.camera.core.resolutionselector.AspectRatioStrategy

enum class CameraType(val value: String) : Enumerable {
  FRONT("front"),
  BACK("back");

  fun mapToCharacteristic() = when (this) {
    FRONT -> CameraMetadata.LENS_FACING_FRONT
    BACK -> CameraMetadata.LENS_FACING_BACK
  }
}

enum class CameraRatio(val value: String) : Enumerable {
  FOUR_THREE("4:3"),
  SIXTEEN_NINE("16:9"),
  ONE_ONE("1:1");

  fun mapToStrategy() = when (this) {
    FOUR_THREE -> AspectRatioStrategy.RATIO_4_3_FALLBACK_AUTO_STRATEGY
    SIXTEEN_NINE -> AspectRatioStrategy.RATIO_16_9_FALLBACK_AUTO_STRATEGY
    else -> AspectRatioStrategy.RATIO_16_9_FALLBACK_AUTO_STRATEGY
  }
}

enum class FlashMode(val value: String) : Enumerable {
  AUTO("auto"),
  ON("on"),
  OFF("off");

  fun mapToLens() = when (this) {
    AUTO -> ImageCapture.FLASH_MODE_AUTO
    OFF -> ImageCapture.FLASH_MODE_OFF
    ON -> ImageCapture.FLASH_MODE_ON
  }
}

enum class CameraMode(val value: String) : Enumerable {
  PICTURE("picture"),
  VIDEO("video")
}

enum class FocusMode(val value: String) : Enumerable {
  ON("on"),
  OFF("off")
}
