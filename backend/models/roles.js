// Model-Name: RolesModel

var mongoose = require('mongoose');

var Roles = mongoose.Schema;

var RolesSchema = new Roles({
  title:  String,
  author: String,
});

var RolesModel = mongoose.model('RolesModel', RolesSchema);

module.exports = RolesModel;