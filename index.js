var crypto = require('crypto');
var Buffer = require('buffer').Buffer;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var map = require('event-stream').map;

var FILE_DECL = /(?:href=|src=|url\()['|"](.*)\?rev=([^\s>"']+?)['|"]/gi;

var revPlugin = function revPlugin() {

  return map(function(file, cb) {
    var contents;
    var lines;
    var i;
    var line;
    var groups;
    var declarations;
    var hash;

    if(!file) {
      throw new PluginError('gulp-rev-append-any', 'Missing file option for gulp-rev-append-any.');
    }

    if(!file.contents) {
      throw new PluginError('gulp-rev-append-any', 'Missing file.contents required for modifying files using gulp-rev-append-any.');
    }

    contents = file.contents.toString();
    lines = contents.split('\n');

    for(i = 0; i < lines.length; i++) {
      line = lines[i];
      declarations = line.match(FILE_DECL);

      if (declarations && declarations.length > 0) {
        for(var j = 0; j < declarations.length; j++) {
          groups = FILE_DECL.exec(declarations[j]);
          if(groups && groups.length > 1) {
            hash = crypto.randomBytes(5).toString('hex');
            line = line.replace(groups[2], hash);
          }
          FILE_DECL.lastIndex = 0;
        }
        lines[i] = line;
      }
    }

    file.contents = new Buffer(lines.join('\n'));
    cb(null, file);

  });

};

module.exports = revPlugin;