const express = require("express");
const ejs = require('ejs');
const app = express();

app.set("view engine", "ejs");

exports.startServer = () => {
	app.listen(3000);
};

exports.express = express;
exports.app = app;
