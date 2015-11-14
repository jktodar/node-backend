/**
 * Expose the Hoodies Model.
 */

module.exports = Hoodies;


/**
 * Hoodies model constructor.
 * @param {!express app} app Express App Instance.
 * @param {Object=} opt_resource Optional Resource.
 * @constructor
 */
function Hoodies(app, opt_resource) {
	/**
	 * Local reference to the Express application
	 * @type {!express.app}
	 */
	this.app = app;

	/**
	 * The name of the collection.
	 * @const {string}
	 * @private
	 */
	this.collectionName_ = 'hoodies';

	// Initialize the model.
	this.init_();
}


/**
 * Initializes the model.
 * @private
 */
Hoodies.prototype.init_ = function() {
	// Get a reference to the Mongo DB handle.
	this.dbc = this.app.get('mongo');

	// Establish the collection connection.
	this.collection = this.dbc.collection(this.collectionName_);
};


/**
 * Gets and returns a collection.
 * @param {!Function} cb The callback to fire when done.
 */
Hoodies.prototype.find = function(cb) {
	this.collection.find().sort({name: 1}).toArray(function(err, hoodies){
		cb(err, hoodies);
	});
};





