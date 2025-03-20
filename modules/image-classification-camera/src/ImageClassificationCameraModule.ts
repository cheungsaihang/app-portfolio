import { NativeModule, requireNativeModule } from 'expo';
import { PermissionResponse } from 'expo-modules-core';

type ImageClassificationCameraModuleEvents = {}
declare class ImageClassificationCameraModule extends NativeModule<ImageClassificationCameraModuleEvents> {
  readonly getCameraPermissionsAsync: () => Promise<PermissionResponse>;
  readonly requestCameraPermissionsAsync: () => Promise<PermissionResponse>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ImageClassificationCameraModule>('ImageClassificationCamera');
