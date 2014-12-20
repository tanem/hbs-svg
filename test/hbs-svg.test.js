var path = require('path');
var fs = require('fs');
var readdirp = require('readdirp');
var rimraf = require('rimraf');
var test = require('tape');
var hbsSvg = require('..');

var counter = 0;
var sourceDir = path.join(__dirname, 'fixtures');

test('should write the specified Handlebars helper file', function(t){
  t.plan(1);
  var destDir = path.join(__dirname, '_build' + counter++);
  var helperFile = path.join(destDir, 'helper.js');

  hbsSvg({
    sourceDir: sourceDir,
    helperFile: helperFile,
    imageFolder: destDir
  }, function(){
    fs.readFile(helperFile, function(err, data){
      if (err) t.fail(err);
      t.equal(
        data.toString(),
        'var Handlebars = require(\'handlebars\');\n\n' +
        'Handlebars.registerHelper(\'newspaper.svg\', function(){\n' +
        '  return \'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M28 8V4H0v22c0 1.105.895 2 2 2h27c1.657 0 3-1.343 3-3V8h-4zm-2 18H2V6h24v20zM4 10h20v2H4zm12 4h8v2h-8zm0 4h8v2h-8zm0 4h6v2h-6zM4 14h10v10H4z"/></svg>\';\n' +
        '});\n\n' +
        'Handlebars.registerHelper(\'subfolder/home.svg\', function(){\n' +
        '  return \'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M32 18.45L16 6.03 0 18.45v-5.063L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z"/></svg>\';\n' +
        '});\n\n'
      );
      rimraf(destDir, function(err){
        if (err) t.fail(err);
      });
    });
  });
});

test('should write an optimised file that\'s not in a subfolder', function(t){
  t.plan(1);
  var destDir = path.join(__dirname, '_build' + counter++);
  var helperFile = path.join(destDir, 'helper.js');

  hbsSvg({
    sourceDir: sourceDir,
    helperFile: helperFile,
    imageFolder: destDir
  }, function(){
    fs.readFile(path.join(destDir, 'newspaper.svg'), function(err, data){
      if (err) t.fail(err);
      t.equal(
        data.toString(),
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M28 8V4H0v22c0 1.105.895 2 2 2h27c1.657 0 3-1.343 3-3V8h-4zm-2 18H2V6h24v20zM4 10h20v2H4zm12 4h8v2h-8zm0 4h8v2h-8zm0 4h6v2h-6zM4 14h10v10H4z"/></svg>'
      );
      rimraf(destDir, function(err){
        if (err) t.fail(err);
      });
    });
  });
});

test('should write an optimised file that\'s in a subfolder', function(t){
  t.plan(1);
  var destDir = path.join(__dirname, '_build' + counter++);
  var helperFile = path.join(destDir, 'helper.js');

  hbsSvg({
    sourceDir: sourceDir,
    helperFile: helperFile,
    imageFolder: destDir
  }, function(){
    fs.readFile(path.join(destDir, 'subfolder/home.svg'), function(err, data){
      if (err) t.fail(err);
      t.equal(
        data.toString(),
        '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M32 18.45L16 6.03 0 18.45v-5.063L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z"/></svg>'
      );
      rimraf(destDir, function(err){
        if (err) t.fail(err);
      });
    });
  });
});
