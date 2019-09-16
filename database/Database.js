/**
 * Loading environment variables
 */
require('dotenv').config();

/**
 * Variable for accessing the querybuilder knex.js
 * 
 * @type {object} Knex
 */
const Knex = require('knex');

/**
 * Variable for access to the knex.js configuration
 * 
 * @type {object} knexConfig
 */
const knexConfig = require('./knexfile');

/**
 * Variable to access the database
 * 
 * @type {object} knex
 */
const knex = Knex(knexConfig[process.env.NODE_ENV]);

module.exports = knex;
