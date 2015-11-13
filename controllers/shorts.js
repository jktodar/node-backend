var Shorts = require('../models/shorts'),
    ObjectID = require('mongodb').ObjectID;


/**
 * Expose the "Shorts" Controller.
 */
module.exports = new ShortsController;



/**
 * Constructor for the Shorts Controller.
 * @constructor
 */
function ShortsController() {}


/**
 * Responds with all shorts matching the params.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
ShortsController.prototype.find = function(req, res) {
  var model = new Shorts(req.app);
  model.find(function(err, shorts) {
    res.json(shorts);
  });
};


/**
 * Responds with one shorts matching the params.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
ShortsController.prototype.findOne = function(req, res) {
  var model = new Shorts(req.app);
  var shortsID = req.params && req.params.id ? req.params.id : null;
  var query = {_id: new ObjectID(shortsID)};
  model.findOne(query, function(err, shorts) {
    res.json(shorts);
  });
};


/**
 * Updates the shorts.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
ShortsController.prototype.update = function(req, res) {
  var model = new Shorts(req.app);
  var shortsID = req.params && req.params.id ? req.params.id : null;
  var query = {_id: new ObjectID(shortsID)};
  var resource = req.body;
  model.update(query, resource, function(err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
};
