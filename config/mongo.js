/**
 * Configuration for the MongoDB client connection.
 * Since the MongoDB connection handles it's own pooling, we only need one
 * connection for the application.
 */
var MongoClient = require('mongodb').MongoClient,
    util = require('util');



/**
 * Configures the MongoDB connection.
 * @param {!express} app The express application instance.
 * @constructor
 */
function Mongo(app) {
  /**
   * Local reference to tha express app.
   * @private {!express}
   */
  this.app_ = app;

  /**
   * Connection string for Mongo.
   * @private {string}
   */
  this.connectionString_ = 'mongodb://localhost:27017/promocenter';

  // Connect to the database.
  this.connect_();
}


/**
 * Attempts to connect to the Mongo database, and throws an error if
 * unseccessful.
 * @private
 */
Mongo.prototype.connect_ = function() {
  var connectionString = this.connectionString_,
      self = this;

  if (connectionString) {
    MongoClient.connect(connectionString, function(err, dbc) {
      if (err) {
        self.handleError_(err);
      } else {
        // Store the Mongo DBC on the "mongo" namespace.
        self.app_.set('mongo', dbc);
        self.dbc = dbc;
      }
    });
  } else {
    var err = util.format(
        'Could not connect to Mongo DB using connection string "%s"',
        this.connectionString);
    this.handleError_(err);
  }
};


/**
 * Throws a new error with the error message. Since the application cannot
 * function without a functional database, the entire process is shutdown.
 * @param {string} err The error message to display.
 * @private
 */
Mongo.prototype.handleError_ = function(err) {
  throw new Error(err);
};


/**
 * Expose the Mongo Module.
 */
module.exports = Mongo;
