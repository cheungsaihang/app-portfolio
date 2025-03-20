import { Ref } from 'react';
import type { ViewProps, ViewStyle } from 'react-native';

export interface ImageClassificationCameraViewRef {
  readonly resumePreview: () => Promise<void>;
  readonly pausePreview: () => Promise<void>;
}

//Listeners
export type ClassificationResult = { label: string; score: string };

export type CameraReadyListener = () => void;
export type CameraMountErrorListener = { message: string };
export type ClassificaionErrorListener = ({nativeEvent}:{nativeEvent:string}) => void; 
export type ClassificaionResultListener = ({nativeEvent}:{nativeEvent:ClassificationResult}) => void; 

// export type ClassificaionErrorListener = (error:string) => void; 
// export type ClassificaionResultListener = (result:ClassificationResult) => void; 

export type CameraNativeProps = {
  ref?: Ref<ImageClassificationCameraViewRef>;
  style?: ViewStyle;
  onCameraReady?: CameraReadyListener;
  onMountError?: CameraMountErrorListener;
  onClassificaionError?: ClassificaionErrorListener;
  onClassificationResult?: ClassificaionResultListener;
  //pointerEvents?: any;
  //enableTorch?: boolean;
  //autoFocus?: FocusMode;
  //mute?: boolean;
  //zoom?: number;
};

export type ImageClassificationCameraViewProps = {
  ref?: Ref<ImageClassificationCameraViewRef>;
  style?: ViewStyle;
  onCameraReady?: () => void;
  onClassificaionError?: (error:string) => void;
  onClassificationResult?: (result:ClassificationResult) => void; 
};