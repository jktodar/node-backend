/**
 * Configuration for the application's routes. Loads all the routes based the
 * route definitions provided in the routes.JSON file.
 */
var express = require('express'),
    path = require('path'),
    util = require('util');



/**
 * Configures the routes for the application by attaching the router middlewhere
 * to the Express app.
 * @param {!express} app The express application instance.
 * @constructor
 */
function Router(app) {
  /**
   * Router configuration for the Express app.
   * @type {!express.Router}
   * @private
   */
  this.router_ = express.Router();

  /**
   * Routes configuration for the application. All routes should be registered
   * in this JSON file. The controller name is the key, and the convention is
   * that it should have the same name as the controller filename, less the
   * extension.
   * @type {json}
   * @private
   */
  this.routes_ = require(path.join(__dirname, 'routes.json'));

  // Configure the router middleware.
  this.getRoutes();

  // Attach the router middleware to the Express app.
  app.use(this.router_);
}


/**
 * Retrieves the controller provided a given controller name.
 * @param {string} name The name of the controller to fetch.
 * @return {!Function} The controller class.
 */
Router.prototype.getController = function(name) {
  var ctrl, error;

  try {
    ctrl = require(path.join(Router.CONTROLLER_DIRECTORY_, name));
  } catch (e) {
    error = e;
  }
  if (!ctrl) {
    throw new Error(util.format('Could not load the "%s" controller: %s',
        name, error));
  }
  return ctrl;
};


/**
 * Gets the routes for each controller from the routes configuration. If any
 * controller cannot be loaded, the method should abort and throw an error,
 * which, in-effect, kills the application.
 */
Router.prototype.getRoutes = function() {
  var controllers = Object.keys(this.routes_),
      router = this.router_;

  controllers.forEach(function(name) {
    var routes = this.routes_[name];
    // Attempt to load the controller.
    var ctrl = this.getController(name);
    if (ctrl) {
      // Load the configuration for each route.
      routes.forEach(function(route) {
        var verb = route.verb,
            path = route.path,
            action = route.action,
            middleware = route.middleware,
            callback = ctrl[action];

        if (middleware) {
          var middlewareFn = ctrl[route.middleware];
          router[verb](path, middlewareFn, callback);
        } else {
          router[verb](path, callback);
        }
      });
    } else {
      throw new Error(util.format(
          'Could not load the routes for the "%s" controller.', name));
    }
  }, this);
};


/**
 * Gets all the routes that match a particular verb, such as GET, POST, DELETE,
 * etc. This is mostly a utility method for unit testing.
 * @param {string} verb the Type of HTTP request to find routes for.
 * @return {!Array.<string>} List of routes matching the supplied verb.
 */
Router.prototype.getRoutesByVerb = function(verb) {
  var controllers = Object.keys(this.routes_),
      paths = [];

  // Get each route that matches the verb.
  controllers.forEach(function(name) {
    this.routes_[name].forEach(function(route) {
      if (route.verb === verb) {
        paths.push(route.path);
      }
    });
  }, this);

  return paths;
};


/**
 * (Relative) path to the controllers directory.
 * @const {string}
 * @private
 */
Router.CONTROLLER_DIRECTORY_ = '../controllers/';


/**
 * Expose the Router Module.
 */
module.exports = Router;
