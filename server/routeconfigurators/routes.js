'use strict';

var RouteConfigurator = function RouteConfigurator(){};
var JSONMarkdownTable = require('jsonmarkdowntable')

RouteConfigurator.prototype.configureRoutes = function configureRoutes(app){
	app.post('/sendFields', function(req, res){
		JSONMarkdownTable.createJSONMarkdownTable(req.body, function(err, response){
			if(err){
				res.send(err.message);
			} else {
				res.status(200).send(response);
			}
		});
	});
};

module.exports = new RouteConfigurator();