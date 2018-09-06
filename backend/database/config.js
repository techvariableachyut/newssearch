// Importing the modules
require('dotenv').config();

//database credentials
var db_name = process.env.DB_NAME;
var host = process.env.DB_HOST;
var port = process.env.DB_PORT;

// Mongoose-MongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://'+host+':'+port+'/'+db_name, { useNewUrlParser: true });

module.exports = mongoose;
