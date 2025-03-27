// Reexport the native module. On web, it will be resolved to TextClassificationModule.web.ts
// and on native platforms to TextClassificationModule.ts
export { default as TextClassification } from './src/TextClassificationModule';
export * from  './src/TextClassification.types';
