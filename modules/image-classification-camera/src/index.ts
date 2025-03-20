import { createPermissionHook, PermissionResponse } from 'expo-modules-core';
import ImageClassificationCameraModule from "./ImageClassificationCameraModule"; 
export { ClassificationResult } from './ImageClassificationCamera.types';
export { default as ImageClassificationCameraView } from "./ImageClassificationCameraView";

async function requestCameraPermissionsAsync(): Promise<PermissionResponse> {
  return ImageClassificationCameraModule.requestCameraPermissionsAsync();
}

async function getCameraPermissionsAsync(): Promise<PermissionResponse> {
  return ImageClassificationCameraModule.getCameraPermissionsAsync();
}

export const useCameraPermissions = createPermissionHook({
  getMethod: getCameraPermissionsAsync,
  requestMethod: requestCameraPermissionsAsync,
});
