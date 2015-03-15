/**
 * Usage:
 *  elixir(function (mix) {
 *    mix.modules();
 *
 *    // - or -
 *
 *    mix.modules({ modulesDir: '/path/to/frontend-modules', version: true|false });
 *  });
 *
 * Options:
 *  - modulesDir: string
 *    Path to the frontend modules parent directory. Defaults to elixir.config.assetsDir.
 *  - version: bool
 *    Eventually calls mix.version() on created frontend bundle files if set. Defaults to false.
 */


var elixir = require('laravel-elixir');
var fs     = require('fs');
var path   = require('path');


function defaultOptions (options, defaults) {
  options = options || {};

  for (var key in defaults) {
    if (!defaults.hasOwnProperty(key)) { continue; }

    if (typeof options[key] === 'undefined') {
      options[key] = defaults[key];
    }
  }

  return options;
}


function bundleStyles (mix, moduleName, modulesDir) {
  var moduleStylesPath = path.join(modulesDir, moduleName, 'styles');
  var moduleCssFile = path.join(mix.cssOutput, moduleName + '.css');

  if (!fs.existsSync(moduleStylesPath)) { return null; }

  mix.styles('*.css', moduleCssFile, moduleStylesPath);

  return moduleCssFile;
}

function bundleScripts (mix, moduleName, modulesDir) {
  var moduleScriptsPath = path.join(modulesDir, moduleName, 'scripts');
  var moduleJsFile = path.join(mix.jsOutput, moduleName + '.js');

  if (!fs.existsSync(moduleScriptsPath)) { return null; }

  mix.scripts('*.js', moduleJsFile, moduleScriptsPath);

  return moduleJsFile;
}

function bundleImages (mix, moduleName, modulesDir) {
  var moduleImagesPath = path.join(modulesDir, moduleName, 'images');

  if (!fs.existsSync(moduleImagesPath)) { return null; }

  mix.copy(moduleImagesPath, path.join(mix.imgOutput || 'public/images', moduleName));

  return moduleImagesPath;
}

function bundleModules (mix, moduleNames, options) {
  var moduleBundleCssFiles = [];
  var moduleBundleJsFiles = [];

  moduleNames.forEach(function (moduleName) {
    var moduleCssFile = bundleStyles(mix, moduleName, options.modulesDir);
    if (moduleCssFile) { moduleBundleCssFiles.push(moduleCssFile); }

    var moduleJsFile = bundleScripts(mix, moduleName, options.modulesDir);
    if (moduleJsFile) { moduleBundleJsFiles.push(moduleJsFile); }

    bundleImages(mix, moduleName, options.modulesDir);
  });

  if (options.version) {
    mix.version(moduleBundleCssFiles.concat(moduleBundleJsFiles));
  }
}


elixir.extend('modules', function (moduleNames, options) {
  var mix = this;

  if (typeof moduleNames === 'object' && !Array.isArray(moduleNames)) {
    options = moduleNames;
    moduleNames = null;
  }

  options = defaultOptions(options, {
    modulesDir: mix.assetsDir,
    version: false
  });

  moduleNames = moduleNames || fs.readdirSync(options.modulesDir);


  bundleModules(mix, moduleNames, options);

  return mix;
});
