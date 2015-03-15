# gulp-elixir-modules
Elixir extension for handling frontend modules easily. Written for use with the famous [Laravel 5](http://laravel.com/)
framework, but might also work for any other project using [gulp](http://gulpjs.com/).


## What is this plugin about?

This plugin is your starting point when you notice that the traditional way of arranging frontend assets
like stylesheets, javascript files, images and so on does not scale with the size of your application.

To illustrate the problem I will present the case of an example webmail application.


## Installation

```sh
npm install gulp-elixir-modules --save-dev
```

## Usage

This is a sample gulpfile using the plugin:

```javascript
var elixir = require('laravel-elixir');
require('gulp-elixir-modules');

// Optionally change default paths:
elixir.config.assetsDir = 'resources/';
elixir.config.cssOutput = 'public/css';
elixir.config.jsOutput  = 'public/js';
elixir.config.imgOutput = 'public/images';            // normally not an elixir configuration property, but used by gulp-elixir-modules
elixir.config.bowerDir  = 'vendor/bower_components';

elixir(function (mix) {
  mix.modules();

  // - or pass custom options -

  var options = {
    modulesDir: '/path/to/frontend-modules',    // Path to the frontend modules parent directory. Defaults to elixir.config.assetsDir.
    version: true                               // Eventually calls mix.version() on created frontend bundle files if set. Defaults to false.
  };

  mix.modules(options);

  // - or  -

  mix.modules(['list', 'of', 'frontend', 'modules'], options);
});
```

## A well-conceived way to arrange client-side assets

### The Problem

A traditional assets directory structure looks like this:

```
resources/    (often called 'assets' or 'public')
  css/
    contacts.css
    inbox.css
    mail-editor.css
    style.css
    toolbar.css
  js/
    app.js
    contacts.js
    inbox.js
    fancy-plugin.js
    mail-editor.js
  img/
    app-logo.png
    editor-icons.png
```

There is nothing really wrong about it. You just have your assets and you grouped them by type. But when your project
gets bigger you will reach the point where there are just **too many files** in each directory and **things get ugly**.

So what to do about it? And how to prevent it in the first place?

### The Solution

The solution is pretty straight-forward: You don't group files by type, since this approach does not scale
(the number of different asset types is fixed, in sharp contrast to the total file count). You group by what function
the files fulfill.

That simple observation is true for practically any frontend framework, no matter whether you use Angular, React, jQuery
or anything else.
So from now on we will group the assets by **module**. A (frontend) module is **one feature of your application**.

New approach:

```
resources/
  app/
    images/
      app-logo.png
    scripts/
      app.js
    styles/
      style.css
      toolbar.css
  contacts/
    scripts/
      contacts.js
    styles/
      contacts.css
  fancy-plugin/
    scripts/
      plugin.js
  inbox/
    scripts/
      inbox.js
    styles/
      inbox.css
  mail-editor/
    images/
      editor-icons.png
    scripts/
      editor.js
    styles/
      editor.css
```

You see the advantage? It becomes easier to find what you are looking for even if split your files into smaller ones.
It is easy to handle a great amount of files now and you have them separated by what they do what is a real benefit
if you want to lazy-load your assets or need to manage dependencies. Additionally you may name your files inside a
module just as you want.

This gulp plugin will produce the following files, no matter how many source files you have in each module:

```
public/
  css/
    app.css
    contacts.css
    inbox.css
    mail-editor.css
  js/
    app.js
    contacts.js
    fancy-plugin.js
    inbox.js
    mail-editor.js
  images/
    app-logo.png
    editor-icons.png
```


## API

### mix.modules([modules: string[],] [options: object])

##### modules: string[]

List of module names to compile. The default is to take all directory names in the module base directory (see `options.modulesDir`).

##### options: object

- `options.modulesDir`: string
  Path to the modules parent directory. Defaults to elixir.config.assetsDir.
- `options.version`: bool
  Eventually calls mix.version() on created frontend bundle files if set. Defaults to false.


## Laravel 4

You may use Elixir and gulp-elixir-modules with Laravel 4, too! Have a look at [https://medium.com/@specter_bg/using-laravel-elixir-with-laravel-4-24bc506ae1fd](https://medium.com/@specter_bg/using-laravel-elixir-with-laravel-4-24bc506ae1fd).


## License

This software is licensed under the terms of the MIT license. See LICENSE for details.
