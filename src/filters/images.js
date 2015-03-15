
var fs   = require('fs');
var path = require('path');

function bundleImages (mix, moduleName, assetDirName, options) {
  var moduleImagesPath = path.join(options.modulesDir, moduleName, assetDirName);

  if (!fs.existsSync(moduleImagesPath)) { return null; }

  mix.copy(moduleImagesPath, path.join(mix.imgOutput || 'public/images', moduleName));

  return null;
}

module.exports = bundleImages;
