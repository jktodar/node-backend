/**
 * Expose the Shirts Model.
 */
module.exports = Shirts;



/**
 * Shirts model constructor.
 * @param {!express.app} app Express App instance.
 * @param {Object=} opt_resource Optional resource.
 * @constructor
 */
function Shirts(app, opt_resource) {
  /**
   * Local reference to the express application.
   * @type {!express.app}
   */
  this.app = app;

  /**
   * The name of the collection.
   * @const {string}
   * @private
   */
  this.collectionName_ = 'shirts';

  // Initialize the model.
  this.init_();
}


/**
 * Initializes the model.
 * @private
 */
Shirts.prototype.init_ = function() {
  // Get a reference to the Mongo DB Handle.
  this.dbc = this.app.get('mongo');

  // Establish the collection connection.
  this.collection = this.dbc.collection(this.collectionName_);
};


/**
 * Gets and returns a collection.
 * @param {!Function} cb The callback to fire when done.
 */
Shirts.prototype.find = function(cb) {
  this.collection.find().sort({name: 1}).toArray(function(err, shirts) {
    cb(err, shirts);
  });
};


/**
 * Gets and returns one record matching the data/criteria provided.
 * @param {!Object} data The data criteria in which to search for the resource.
 * @param {!Function} cb The callback to fire when done.
 */
Shirts.prototype.findOne = function(data, cb) {
  this.collection.findOne(data, function(err, shirts) {
    cb(err, shirts);
  });
};


/**
 * Updates the shirt.
 * @param {!Object} query The query criteria in which to search on.
 * @param {!Object} resource The resource to use while updating.
 * @param {!Function} cb The callback to fire when done.
 */
Shirts.prototype.update = function(query, resource, cb) {
  // Operations will fail if there is an "_id" in the body and the ID
  // is NOT an ObjectID.
  if (resource._id) {
    delete resource._id;
  }
  this.collection.updateOne(query, resource, function(err, shirt) {
    cb(err, shirt);
  });
};
