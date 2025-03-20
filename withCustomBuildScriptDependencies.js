/*
Use for add custom build script dependencies to build.gradle in root folder
*/
const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function withCustomBuildScriptDependencies(config) {
  return withProjectBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      /dependencies \{/,
      `dependencies {
        classpath('androidx.navigation:navigation-safe-args-gradle-plugin:2.5.0')
        classpath('de.undercouch:gradle-download-task:4.1.2')`
    );
    return config;
  });
};
