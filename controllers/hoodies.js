var Hoodies = require('../models/hoodies'),
		ObjectID = require('mongodb').ObjectID;


/**
 * Expose the "Hoodies" Controller.
 */
module.exports = new HoodiesController;



/**
 * Constructor for the Hoodies Controller.
 * @constructor
 */
function HoodiesController() {}


/**
 * Responds with a list of hoodies matching the params
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
HoodiesController.prototype.find = function(req, res) {
	var model = new Hoodies(req.app);
	model.find(function(err, hoodies){
		res.json(hoodies);
	});
};