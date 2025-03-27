import ExpoModulesCore
import TensorFlowLiteTaskText
import OSLog

typealias ClassifierResult = [String:Any]

public class TextClassificationModule: Module {
  
  private var classifier: TFLNLClassifier?
  
  private var modelPath: URL?
  
  private let logger = Logger()

  public func definition() -> ModuleDefinition {

    Name("TextClassification")
    
    OnCreate {
      loadModel()
    }
    
    AsyncFunction("classify") { (value: String) -> [ClassifierResult] in
      return classify(text: value)
    }
  }
  
  private func loadModel() {
    guard let url = URL(string: "https://storage.googleapis.com/download.tensorflow.org/models/tflite/task_library/text_classification/android/text_classification_v2.tflite") else { return }
    let downloadTask = URLSession.shared.downloadTask(with: url) {
      urlOrNil, responseOrNil, errorOrNil in
      guard let fileURL = urlOrNil else { return }
      do {
        let documentsURL = try
              FileManager.default.url(for: .documentDirectory,
                                      in: .userDomainMask,
                                      appropriateFor: nil,
                                      create: false)
        let savedURL = documentsURL.appendingPathComponent(fileURL.lastPathComponent)
        try FileManager.default.moveItem(at: fileURL, to: savedURL)
        self.modelPath = savedURL
        self.setupClassifier()

      } catch {
          print ("file error: \(error)")
      }
    }
    downloadTask.resume()
  }
  
  private func setupClassifier(){
    guard let modelPath = self.modelPath else { return }
//    guard let modelPath = Bundle.main.path(
//      forResource: "text_classification", ofType: "tflite") else { return }
    let options = TFLNLClassifierOptions()
    
    self.classifier = TFLNLClassifier.nlClassifier(modelPath: modelPath.relativePath, options: options)
  }
  
  /// Classify the text and display the result.
  private func classify(text: String) -> [ClassifierResult] {
    var label = "--"
    var score:NSNumber = 0
    var results: [ClassifierResult] = []

    if let classifier = self.classifier {
      let classifierResults = classifier.classify(text: text)
      for key in classifierResults.keys {
        label = key
        score = classifierResults[key] ?? NSNumber(0)
        results.append(["label": label, "score": score])
      }
    }
    return results
  }
}
