var fs = require('fs'),
  jade = require('jade'),
  _ = require('underscore'),
  _s = require('underscore.string');

var RendererService = module.exports = {
  getClientRenderer: function(path, callback) {
    var filename = 'views/' + path + '.jade';
    fs.readFile(filename, function (err, jadeStr) {
      if (err) return callback(err);

      var render = jade.compile(jadeStr, { client: true, filename: filename }),
          parts = path.split('/'),
          renderFunctionName = _s.camelize(parts.pop()),
          namespace;
      parts.unshift('render');
      namespace = parts.join('.');
      render = _.template('MB.namespace("<%= namespace %>").<%= renderFunctionName %> = ')({ namespace: namespace, renderFunctionName: renderFunctionName }) + render.toString();
      callback(null, render);
    });
  }
};