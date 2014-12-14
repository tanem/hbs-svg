# hbs-svg

[![Build Status](https://travis-ci.org/tanem/hbs-svg.png?branch=master)](https://travis-ci.org/tanem/hbs-svg)
[![NPM version](https://badge.fury.io/js/hbs-svg.svg)](http://badge.fury.io/js/hbs-svg)

Generate [Handlebars](http://handlebarsjs.com/) helpers for optimised inline SVG. The optimised SVG files are also saved for those situations where you don't want an inline SVG (e.g. background image).

```
Usage: hbs-svg [source dir] {OPTIONS}

Examples:
  hbs-svg src/ --hf build/helpers.js --if build/

Options:
  --hf, --helper-file   Write the handlebars helpers to this file  [required]
  --if, --image-folder  Write the optimised images to this folder  [required]
```

## Installation

```
$ npm install hbs-svg --save
```

## Examples

To optimise SVG files from `src/`, outputting Handlebars helpers to `build/helpers.js` and optimised SVG files to `build/`:

```
$ hbs-svg src/ --hf build/helpers.js --if build/
```

You can use the API directly too:

```js
var hbsSvg = require('hbs-svg');

hbsSvg({
  sourceDir: './src',
  helperFile: './build/helpers.js',
  imageFolder: './build'
}, function(){
  console.log('done');
});
```

## Tests

```
$ npm test
```

## Credits

The idea for this tool was based on [this](http://mir.aculo.us/2014/10/31/icon-fonts-vs-inline-svg/) article by @madrobby.