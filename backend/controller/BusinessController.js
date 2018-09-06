var express = require("express");

var businessRouter = express.Router();

// Importing the business model
var BusinessModel = require("./../models/business");

// Routes
businessRouter.get('/business', function(request, response){
	console.log("Load one template");
	response.render('business');
});

businessRouter.post('/business', function(request, response){
	response.json({
		name: "Nilu"
	});
});

// Export all the functions
module.exports = businessRouter;

