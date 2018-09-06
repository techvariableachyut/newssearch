// Starting point of the application
// node index.js

// Importing express, path
var express = require('express');
var app = new express();
var path = require('path');

// Importing custom modules
var businessController = require('./controller/BusinessController');

// Setting the view-engine to EJS
app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, "views"));

app.use('/list',businessController);

// Calling the http module
app.listen(8000, function(){
	console.log('Worked');
})
