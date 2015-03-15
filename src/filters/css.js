
var fs   = require('fs');
var path = require('path');

function bundleStyles (mix, moduleName, assetDirName, options) {
  var moduleStylesPath = path.join(options.modulesDir, moduleName, assetDirName);
  var moduleCssFile = path.join(mix.cssOutput, moduleName + '.css');

  if (!fs.existsSync(moduleStylesPath)) { return null; }

  mix.styles('*.css', moduleCssFile, moduleStylesPath);

  return moduleCssFile;
}

module.exports = bundleStyles;
