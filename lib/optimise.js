var BufferStreams = require('bufferstreams');
var SVGO = require('svgo');
var svgo = new SVGO();

module.exports = function(){
  return new BufferStreams(function(err, buf, cb){
    if (err) throw err;
    svgo.optimize(buf.toString(), function(res){
      cb(null, res.data);
    });
  });
};