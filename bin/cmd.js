#!/usr/bin/env node

var hbsSvg = require('../');

var argv = require('yargs')
  .usage('Usage: $0 [source dir] {OPTIONS}')
  .example('$0 src/ --hf helpers.js --if build/', '')
  .demand(['hf', 'if'])
  .alias('hf', 'helper-file')
  .alias('if', 'image-folder')
  .describe('hf', 'Write the handlebars helpers to this file')
  .describe('if', 'Write the optimised images to this folder')
  .argv;

hbsSvg({
  sourceDir: argv._[0],
  helperFile: argv.hf,
  imageFolder: argv.if
});