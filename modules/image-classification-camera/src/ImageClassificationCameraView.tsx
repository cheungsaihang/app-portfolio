import { useImperativeHandle, useRef } from 'react';
import {
    ImageClassificationCameraViewProps,
    ImageClassificationCameraViewRef,
    ClassificaionErrorListener,
    ClassificaionResultListener,
} from './ImageClassificationCamera.types';
import ImageClassificationCamera from './ImageClassificationCamera';

export default function ImageClassificationCameraView(props:ImageClassificationCameraViewProps){

  //Setup refenence and component methods
  const cameraRef = useRef<ImageClassificationCameraViewRef>(null);

  useImperativeHandle(props.ref, () => {
    return {
      resumePreview: async () => cameraRef.current?.resumePreview(),
      pausePreview: async () => cameraRef.current?.pausePreview()
    };
  }, []);

  // async function resumePreview(): Promise<void> {
  //   return _cameraRef.current?.resumePreview();
  // }
  // async function pausePreview(): Promise<void> {
  //   return _cameraRef.current?.pausePreview();
  // }

  //Event Listener from Native
  const _onCameraReady = () => {
    if (props.onCameraReady) {
      props.onCameraReady();
    }
  };
  const _onClassificationError:ClassificaionErrorListener = ({nativeEvent}) => {
    if (props.onClassificaionError) {
      props.onClassificaionError(nativeEvent);
    }
  };
  const _onClassificationResult:ClassificaionResultListener = ({nativeEvent}) => {
    if (props.onClassificationResult) {
      props.onClassificationResult(nativeEvent);
    }
  };

   const nativeProps = {};

   return (
    <ImageClassificationCamera
      {...nativeProps}
      ref={cameraRef}
      style={{flex:1}}
      onCameraReady={_onCameraReady}
      onClassificaionError={_onClassificationError}
      onClassificationResult={_onClassificationResult}
      //onMountError={_onMountError}
    />
  );
}