var MB = {
  namespace: function(namespace) {
    var namespaceParts = namespace.split('.'),
      namespacePart,
      cur = this;
    for (var i = 0, n = namespaceParts.length; i < n; i++) {
      namespacePart = namespaceParts[i];
      cur = cur[namespacePart] = cur[namespacePart] || {};
    }
    return cur;
  },

  mixin: function(cls, mixinClass) {
    var ctor = function() {
      cls.apply(this, arguments);
      mixinClass.apply(this, arguments);
    };
    _.extend(ctor.prototype, cls.prototype, mixinClass.prototype);
    return ctor;
  }
};