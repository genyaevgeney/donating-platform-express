require('dotenv').config({
  path: '../.env',
});

/**
 * Object for knex.js configuration
 * 
 * @type {Object}
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
}
