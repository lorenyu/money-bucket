MB.namespace('views.components');

MB.views.components.PrimitivePropertyView = Backbone.View.extend({
  propertyName: 'id',
  initialize: function(options) {
    this.propertyName = options.propertyName;
    this.model.on('change:' + this.propertyName, this.render, this);
  },
  render: function() {
    this.$el.html(this.model.get(this.propertyName));
    return this;
  }
});