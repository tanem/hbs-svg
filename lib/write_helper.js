var path = require('path');
var fs = require('fs');
var through = require('through2');
var mkdirp = require('mkdirp');

var headerWritten = false;

module.exports = function(helperFile, svgPath){
  return through(function(chunk, enc, cb){
    mkdirp(path.dirname(helperFile), function(err){
      if (err) throw err;
      var str = '';
      if (!headerWritten) {
        str = 'var Handlebars = require(\'handlebars\');\n\n';
        headerWritten = true;
      }
      str += 'Handlebars.registerHelper(\'' + svgPath + '\', function(){\n' +
        '  return \'' + chunk.toString() + '\';\n' +
        '});\n\n';
      fs.appendFile(helperFile, str, function(err){
        if (err) throw err;
        cb(null, chunk);
      });
    });
  });
};