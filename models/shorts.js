/**
 * Expose the Shorts Model.
 */
module.exports = Shorts;



/**
 * Shorts model constructor.
 * @param {!express.app} app Express App instance.
 * @param {Object=} opt_resource Optional resource.
 * @constructor
 */
function Shorts(app, opt_resource) {
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
  this.collectionName_ = 'shorts';

  // Initialize the model.
  this.init_();
}


/**
 * Initializes the model.
 * @private
 */
Shorts.prototype.init_ = function() {
  // Get a reference to the Mongo DB Handle.
  this.dbc = this.app.get('mongo');

  // Establish the collection connection.
  this.collection = this.dbc.collection(this.collectionName_);
};


/**
 * Gets and returns a collection.
 * @param {!Function} cb The callback to fire when done.
 */
Shorts.prototype.find = function(cb) {
  this.collection.find().sort({title: 1}).toArray(function(err, shorts) {
    cb(err, shorts);
  });
};


/**
 * Gets and returns one record matching the resource/criteria provided.
 * @param {!Object} query The query criteria in which to search on.
 * @param {!Function} cb The callback to fire when done.
 */
Shorts.prototype.findOne = function(query, cb) {
  this.collection.findOne(query, function(err, shorts) {
    cb(err, shorts);
  });
};


/**
 * Updates the short.
 * @param {!Object} query The query criteria in which to search on.
 * @param {!Object} resource The resource to use while updating.
 * @param {!Function} cb The callback to fire when done.
 */
Shorts.prototype.update = function(query, resource, cb) {
  // Operations will fail if there is an "_id" in the body and the ID
  // is NOT an ObjectID.
  if (resource._id) {
    delete resource._id;
  }
  this.collection.updateOne(query, resource, function(err, shorts) {
    cb(err, shorts);
  });
};
