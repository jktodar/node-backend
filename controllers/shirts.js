var Shirts = require('../models/shirts'),
    ObjectID = require('mongodb').ObjectID;


/**
 * Expose the "Shirts" Controller.
 */
module.exports = new ShirtsController;



/**
 * Constructor for the Shirts Controller.
 * @constructor
 */
function ShirtsController() {}


/**
 * Responds with a list of shirts matching the params.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
ShirtsController.prototype.find = function(req, res) {
  var model = new Shirts(req.app);
  model.find(function(err, shirts) {
    res.json(shirts);
  });
};


/**
 * Responds with one shirt matching the params.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
ShirtsController.prototype.findOne = function(req, res) {
  var shirts = new Shirts(req.app);
  var shirtID = req.params && req.params.id ? req.params.id : null;
  var query = {_id: new ObjectID(shirtID)};
  shirts.findOne(query, function(err, shirt) {
    res.json(shirt);
  });
};


/**
 * Updates the shirt.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
ShirtsController.prototype.update = function(req, res) {
  var model = new Shirts(req.app);
  var shirtID = req.params && req.params.id ? req.params.id : null;
  var query = {_id: new ObjectID(shirtID)};
  var resource = req.body;
  model.update(query, resource, function(err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
};
