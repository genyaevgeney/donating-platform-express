/**
 * Variable for access to server
 * 
 * @type {object} server
 */
const server = require('../server.js');

/**
 * Variable for access to form information
 * @type {object} bodyParser
 */
const bodyParser = require("body-parser");

/**
 * Create router
 * 
 * @return {object}
 */
exports.createRouter = () => {
	return server.express.Router();
}

/**
 * Variable for access to donation router
 * 
 * @type {object} donationRouter
 */
const donationRouter = require('./DonationRouter');

/**
 * Configure server
 * 
 * @return void
 */
exports.configureServer = () => {
	server.app.use(server.express.static('/var/www/donating-platform-express.com/public'));
	server.app.use(bodyParser.urlencoded({ extended: false }));
	server.app.use("/", donationRouter);
}
