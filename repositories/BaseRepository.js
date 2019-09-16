/**
 * Class for basic CRUD database operations
 * 
 * @type {object}
 */
module.exports = class BaseRepository {
    constructor() {
        if (new.target === BaseRepository) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.db;
        this.table;
    }

    /**
     * Enter information into the database
     * 
     * @param {object} date
     * 
     * @return void
     */
    create(date) {
        this.db(this.table).insert(date).then(() => console.log("data inserted"));
    }

    /**
     * Get information from the database
     * 
     * @param  {number} perPage
     * 
     * @param  {number} page
     * 
     * @return {object} rows
     */
    read(perPage, page) {
     return new Promise((resolve, reject) => {
        this.db(this.table)
        .select('*')
        .limit(perPage)
        .offset((perPage * page) - perPage)
        .then(rows => {
            resolve(rows);
        });
    });
 }
}
