/**
 * Expose the "Main" Controller.
 */
module.exports = new MainController;



/**
 * Constructor for the Clients Controller.
 * @constructor
 */
function MainController() {}


/**
 * Displays details describing this service.
 * @param {http.IncomingMessage} req Node/Express request object.
 * @param {http.ServerResponse} res Node/Express response object.
 */
MainController.prototype.index = function(req, res) {
  var json = JSON.stringify(require('../config/routes.json'), null, 2);
  res.send([
    '<h1>Welcome to the API Service!</h1>',
    '<h2>See the JSON below for the available API:</h2>',
    '<pre>',
    json,
    '</pre>'
  ].join('\n'));
};
