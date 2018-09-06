// Model-Name: RolesModel

var mongoose = require('./../database/config');

var Business = mongoose.Schema;

var BusinessSchema = new Business({
  name:  String,
});

var BusinessModel = mongoose.model('BusinessModel', BusinessSchema);

module.exports = BusinessModel;