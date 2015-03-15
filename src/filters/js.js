
var fs   = require('fs');
var path = require('path');

function bundleScripts (mix, moduleName, assetDirName, options) {
  var moduleScriptsPath = path.join(options.modulesDir, moduleName, assetDirName);
  var moduleJsFile = path.join(mix.jsOutput, moduleName + '.js');

  if (!fs.existsSync(moduleScriptsPath)) { return null; }

  mix.scripts('*.js', moduleJsFile, moduleScriptsPath);

  return moduleJsFile;
}

module.exports = bundleScripts;
