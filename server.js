/**
 * Variable to access express.js
 * @type {object} express
 */
const express = require("express");

/**
 * Variable to access ejs
 * 
 * @type {object} ejs
 */
const ejs = require('ejs');

/**
 * Variable to access express engine
 * 
 * @type {object} app
 */
const app = express();

/**
 * Configure ejs
 */
app.set("view engine", "ejs");

/**
 * Start server
 * 
 * @return void
 */
exports.startServer = () => {
	app.listen(3000);
};

exports.express = express;
exports.app = app;
