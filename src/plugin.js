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


function objectKeys(object) {
  var keys = [];

  for (var key in object) {
    if (object.hasOwnProperty(key)) { keys.push(key); }
  }

  return keys;
}


function defaultOptions (options, defaults) {
  options = options || {};

  objectKeys(defaults).forEach(function (key) {
    if (typeof options[key] === 'undefined') {
      options[key] = defaults[key];
    }
  });

  return options;
}


function bundleModules (mix, moduleNames, options) {
  var moduleBundleFiles = [];

  moduleNames.forEach(function (moduleName) {
    objectKeys(options.filters).forEach(function (assetDirName) {
      var filter = options.filters[assetDirName];

      var moduleOutFile = filter(mix, moduleName, assetDirName, options);
      if (moduleOutFile) { moduleBundleFiles.push(moduleOutFile); }
    });
  });

  if (options.version) {
    mix.version(moduleBundleFiles);
  }
}


var defaultFilters = {
  // <directory name>: <asset action>
  'scripts': require('./filters/js'),
  'styles': require('./filters/css'),
  'images': require('./filters/images')
};

elixir.extend('modules', function (moduleNames, options) {
  var mix = this;

  if (typeof moduleNames === 'object' && !Array.isArray(moduleNames)) {
    options = moduleNames;
    moduleNames = null;
  }

  options = defaultOptions(options, {
    modulesDir: mix.assetsDir,
    version: false,
    filters: defaultFilters
  });

  moduleNames = moduleNames || fs.readdirSync(options.modulesDir);


  bundleModules(mix, moduleNames, options);

  return mix;
});
