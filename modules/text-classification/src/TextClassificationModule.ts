import { NativeModule, requireNativeModule } from 'expo-modules-core';

import { TextClassificationResult } from './TextClassification.types';

declare class TextClassificationModule extends NativeModule {
  classify(value: string): Promise<TextClassificationResult[] | undefined>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<TextClassificationModule>('TextClassification');
