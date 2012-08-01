MB.namespace('models.util');

/*
 * class that Resetable is mixed in with needs to have methods:
 *  clone, get, set, and fire the 'change' event
 */
MB.models.util.Resetable = function(){
  this._resetable.oldModel = this.clone();
  this.on('change', _.bind(this._resetable.onChange, this));
};
_.extend(MB.models.util.Resetable.prototype, {
  _resetable: {
    oldModel: null,
    changedAttributes: {},
    onChange: function() {
      _.extend(this._resetable.changedAttributes, this.changedAttributes());
    }
  },
  reset: function(attr) {
    if (attr) {
      this.set(attr, this._resetable.oldModel.get(attr));
      delete this._resetable.changedAttributes[attr];
      return this;
    }
    _.each(this._resetable.changedAttributes, function(val, attr) {
      this.reset(attr);
    }, this);
    return this;
  }
});
