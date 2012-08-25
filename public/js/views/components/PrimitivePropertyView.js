MB.namespace('views.components');

MB.views.components.PrimitivePropertyView = Backbone.View.extend({

  defaults: {
    propertyName: 'id'
  },

  initialize: function(options) {
    this.options = options || {};
    _.defaults(this.options, this.defaults);

    this.model.on('change:' + this.options.propertyName, this.render, this);
  },
  render: function() {
    this.$el.html(this.model.get(this.options.propertyName));
    return this;
  }
});