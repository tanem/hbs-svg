var path = require('path');
var fs = require('fs');
var readdirp = require('readdirp');
var through = require('through2');
var optimise = require('./lib/optimise');
var writeHelper = require('./lib/write_helper');
var writeImage = require('./lib/write_image');

module.exports = function(opts, done){

  done || (done = function(){});

  var sourceDir = path.resolve(opts.sourceDir);
  var helperFile = path.resolve(opts.helperFile);
  var imageFolder = path.resolve(opts.imageFolder);

  var source = readdirp({
    root: sourceDir,
    fileFilter: '*.svg'
  });
  
  var counter = 0;

  source.pipe(through.obj(function(entry, _, cb){

    counter++;

    fs.createReadStream(entry.fullPath)
      .pipe(optimise())
      .pipe(writeHelper(helperFile, entry.path))
      .pipe(writeImage(path.join(imageFolder, entry.parentDir), entry.name))
      .on('finish', function(){
        if (!--counter) done();
      });

    cb();

  }));

};