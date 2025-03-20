import * as React from 'react';
import { CameraNativeProps } from './ImageClassificationCamera.types';
import { requireNativeViewManager } from 'expo-modules-core';

// const NativeView: React.ComponentType<CameraNativeProps> =
//   requireNativeView('ImageClassificationCamera');

// export default function ImageClassificationCamera(props: CameraNativeProps) {
//   return <NativeView {...props} />;
// }

const ImageClassificationCamera: React.ComponentType<CameraNativeProps> = requireNativeViewManager('ImageClassificationCamera');

export default ImageClassificationCamera;