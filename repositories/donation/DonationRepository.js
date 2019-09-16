/**
 * Variable to access BaseRepository
 * 
 * @type {object} BaseRepository
 */
const BaseRepository = require("../BaseRepository.js");
/**
 * Variable to access the database
 * 
 * @type {object} knex
 */
const knex = require("../../database/Database.js");


/**
 * Class for work with a database
 */
class DonationRepository extends BaseRepository {

	constructor() {
		super();
		this.db = knex;
		this.table = 'donations';
		this.tableFields = {
			id: 'id',
			volunteerName: 'volunteer_name',
			email: 'email',
			amount: 'amount',
			message: 'message',
			date: 'date'
		};
	}

	/**
	 * Get info for google chart
	 *
	 * @return {object} rows
	 */
	getChartInfo() {
		return new Promise(resolve => {
			knex(this.table)
			.select(knex.raw(`DATE(${this.tableFields.date}) as ${this.tableFields.date}`))
			.sum(`${this.tableFields.amount} as sum`)
			.groupByRaw(`DATE(${this.tableFields.date})`)
			.then(rows => resolve(rows));
		});
	}

	/**
	 * Get page count
	 *
	 * @param  {number} perPage
	 *
	 * @return {number} pages
	 */
	getPageCount(perPage) {
		return new Promise((resolve, reject) => {
			knex(this.table)
			.count(`${this.tableFields.id}`)
			.then(rows => {
				let count = rows[0][Object.keys(rows[0])[0]];
				let pages = Math.ceil(count / perPage);
				resolve(pages);
			});
		});
	}

	/**
	 * Get the most donation
	 * 
	 * @return {object} rows
	 */
	getMaxAmount() {
		return new Promise((resolve, reject) => {
			knex(this.table)
			.max(`${this.tableFields.amount}`)
			.then(rows => {
				resolve(rows[0][Object.keys(rows[0])[0]]);
			});
		});
	}

	/**
	 * Get the name of the person who made the maximum donation
	 * 
	 * @param  {number} maxAmount
	 * 
	 * @return {object} rows
	 */
	getTopDonator(maxAmount) {
		return new Promise((resolve, reject) => {
			knex(this.table)
			.where({
				amount: maxAmount
			})
			.select(`${this.tableFields.volunteerName}`)
			.then(rows => {
				resolve(rows[0][Object.keys(rows[0])[0]]);
			});
		});
	}

	/**
	 * Get the amount of all donations
	 * 
	 * @return {object} rows
	 */
	sumAmount() {
		return new Promise((resolve, reject) => {
			knex(this.table)
			.sum(`${this.tableFields.amount}`)
			.then(rows => {
				resolve(rows[0][Object.keys(rows[0])[0]]);
			});
		});
	}

	/**
	 * Get the amount of donations for the current month
	 * 
	 * @return {object} rows
	 */
	getAmountForThisMonth() {
		return new Promise((resolve, reject) => {
			knex(this.table)
			.sum(`${this.tableFields.amount}`)
			.whereRaw(`MONTH(${this.tableFields.date}) = MONTH(NOW()) AND YEAR(${this.tableFields.date}) = YEAR(NOW())`)
			.then(rows => {
				resolve(rows[0][Object.keys(rows[0])[0]]);
			});
		});
	}

}

module.exports = new DonationRepository();
