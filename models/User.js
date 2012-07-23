var _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var User = module.exports = function(user) {
    // whitelist properties
    user = _.pick(user,
        '_id');
    // set default properties
    user = _.defaults(user, {
        _id: new ObjectID()
    });
    // assign properties to object instance
    _.extend(this, user);
    return this;
};