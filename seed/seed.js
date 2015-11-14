#!/usr/bin/env node

var ObjectID = require('mongodb').ObjectID,
    path = require('path'),
    app = require('../app');



/**
 * The Seed constructor function.
 * @constructor
 */
function Seed() {
  /**
   * The Shirts (Mongo) collection object.
   * @type {!Object}
   */
   this.shirtsCollection;

  /**
   * The Shorts (Mongo) collection object.
   * @type {!Object}
   */
   this.shortsCollection;

  /**
   * List of inserted Shirt IDs.
   * @type {!Array.<string>}
   */
  this.shirtIDs;

  /**
   * List of inserted Template IDs.
   * @type {!Array.<string>}
   */
  this.shortIDs;

  // Kick off the process.
  this.init_();
}


/**
 * Initializes the model. Unforntunately, the Mongo operations in Node use
 * callbacks as opposed to promises - therefore there is quite a bit of nesting.
 * @private
 */
Seed.prototype.init_ = function() {
  var self = this;

  // We need to give Mongo a chance to connect, so we set a timeout.
  setTimeout(function() {
    // Set the DB connection and collection objects.
    self.dbc = app.get('mongo');
    self.shirtsCollection = self.dbc.collection('shirts');
    self.shortsCollection = self.dbc.collection('shorts');
    self.hoodiesCollection = self.dbc.collection('hoodies');

    // Drop current collections.
    self.shirtsCollection.drop(function(err, result) {
      self.shortsCollection.drop(function(err, result) {
        // Start seeding the shirts.
        console.info('Seeding Shirts...');
        self.seedShirts(function() {
          // Seed the shorts.
          console.info('Seeding Shorts...');
          self.seedShorts(function() {
            // Seed the hoodies.
            console.info('Seeding Hoodies...');
            self.seedHoodies(function() {
              // Perform the final task and exit.
              console.info('Seeding complete!!!');
              process.exit(1);
            });
          });
        });
      });
    });

  }, 1000);
};


/**
 * Seeds the shirts from the shirts.json file.
 * @param  {!Function} done The callback to fire when done.
 */
Seed.prototype.seedShirts = function(done) {
  var self = this,
      shirts = require('./shirts.json');

  self.shirtsCollection.insertMany(shirts, function(err, results) {
    // Handle any errors.
    handleError(err);

    // Set the shirtIDs.
    self.shirtIDs = results && results.insertedIds ? results.insertedIds : [];

    // Move to the next step.
    done()
  });
};


/**
 * Seeds the shorts from the shorts.json file.
 * @param  {!Function} done The callback to fire when done.
 */
Seed.prototype.seedShorts = function(done) {
  var self = this,
      shorts = require('./shorts.json');

  self.shortsCollection.insertMany(shorts, function(err, results) {
    // Handle any errors.
    handleError(err);

    // Set the shorts IDs.
    self.shortsIDs = results && results.insertedIds ?
        results.insertedIds : [];

    // Move to the next step.
    done()
  });
};


/**
 * Seeds the hoodies from the hoodies.json file.
 * @param {!Function} done The callback to fire when done.
 */
Seed.prototype.seedHoodies = function(done) {
  var self = this,
      hoodies = require('./hoodies.json');

  self.hoodiesCollection.insertMany(hoodies, function(err, results) {
    // Handle any errors.
    handleError(err);

    // Set the hoodies IDs.
    self.hoodiesID = results && results.insertedIds ? 
        results.insertedIds : [];

    // Move to the next step.
    done();
  });
};



/**
 * Convenience function for handling errors.
 * @param {string} err The error, if any.
 */
function handleError(err) {
  if (err) {
    console.error(err);
    process.exit(0);
  }
}


/**
 * Expose the "Seed" module.
 */
module.exports = new Seed;
