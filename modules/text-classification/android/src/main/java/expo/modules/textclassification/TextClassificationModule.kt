package expo.modules.textclassification

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class TextClassificationModule : Module() {
  private var classifierHelper: TextClassificationHelper? = null
  private val context
    get() = requireNotNull(appContext.reactContext)

  override fun definition() = ModuleDefinition {
    Name("TextClassification")
    AsyncFunction("classify") { value: String ->
      return@AsyncFunction classify(value)
    }
  }

  private fun startHelper(){
    if(classifierHelper == null){
      classifierHelper = TextClassificationHelper(context = context)
    }
  }

  fun classify(value:String):MutableList<Map<String,Any>>{
    startHelper()
    val response = classifierHelper?.classify(value)
    val results = mutableListOf<Map<String,Any>>()
    response?.let { it ->
      it.forEach { item ->
        results.add(ClassifierResult(label = item.label, score = item.score).toMap())
      }
    }
    return results
  }
}

data class ClassifierResult(val label: String, val score: Number) {
  fun toMap(): Map<String, Any> {
    return mapOf(
      "label" to label,
      "score" to score
    )
  }
}
