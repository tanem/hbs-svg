var fs = require('fs');
var path = require('path');
var through = require('through2');
var mkdirp = require('mkdirp');

module.exports = function(folder, filename){
  return through(function(chunk, enc, cb){
    mkdirp(folder, function(err){
      if (err) throw err;
      fs.writeFile(path.join(folder, filename), chunk, function(err){
        if (err) throw err;
        cb(null, chunk);
      });
    });
  });
};