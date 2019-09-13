const server = require('../server.js');
const bodyParser = require("body-parser");

exports.createRouter = () => {
	return server.express.Router();
}

const donationRouter = require('./DonationRouter');

exports.configureServer = () => {
	server.app.use(server.express.static('/var/www/donating-platform-express.com/public'));
	server.app.use(bodyParser.urlencoded({ extended: false }));
	server.app.use("/", donationRouter);
}
