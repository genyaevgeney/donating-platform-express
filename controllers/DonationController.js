/**
 * Variable to access the donation entity repository
 * 
 * @type {object} donationRepository
 */
const donationRepository = require("../repositories/donation/DonationRepository.js");

/**
 * Render error page
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
exports.renderErrorPage = (req, res) => {
	res.render("Error");
}

/**
 * 
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
exports.renderDonatePage = (req, res) => {
	res.render("DonatePage");
}

/**
 * Render form page
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
exports.renderDashboardPage = (req, res) => {
	let perPage = 10;
	let page = req.params.page || 1;

	if(page < 1) {
		res.render("Error");
	} else {
		donationRepository.getPageCount(perPage).then(pages => {
			donationRepository.getMaxAmount().then(maxAmount => {
				donationRepository.getAmountForThisMonth().then(amountForThisMonth => {
					donationRepository.getTopDonator(maxAmount).then(topDonator => {
						donationRepository.sumAmount().then(amount => {
							donationRepository.getChartInfo().then(dataForChart => {
								donationRepository.read(perPage, page).then(donations => {
									let currentPage = Number(req.params.page);
									if(isNaN(currentPage) || currentPage > pages) {
										res.render("Error");
									} else {
										res.render("Dashboard", {
											donations: donations,
											current: page,
											pages: pages,
											maxAmount: maxAmount,
											topDonator: topDonator,
											amount: amount,
											amountForThisMonth: amountForThisMonth,
											dataForChart: dataForChart
										});
									}
								});
							});
						});
					});
				});
			});
		});
	}
}

/**
 * Enter data from the form into the database and redirect to the main page
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
exports.receivingDonationData = (req, res) => {

	const donationInfo = [
		{
			volunteer_name: req.body.name,
			email: req.body.email,
			amount: req.body.amount,
			message: req.body.message,
			date: new Date()
		},
	];

	donationRepository.create(donationInfo);
	res.redirect("/page=1");
}

/**
 * Redirect to home page
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
exports.redirectToFirstPage = (req, res) => {
	res.redirect("/page=1");
}
