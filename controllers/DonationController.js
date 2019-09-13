const Donation = require("../models/Donation.js");
const donation = new Donation();

exports.renderErrorPage = (req, res) => {
	res.render("Error");
}

exports.renderDonatePage = (req, res) => {
	res.render("DonatePage");
}

exports.renderDashboardPage = (req, res) => {
	let perPage = 10;
	let page = req.params.page || 1;

	if(page < 1) {
		res.render("Error");
	} else {
		donation.getNumOfPages(perPage).then(pages => {
			donation.getMaxAmount().then(maxAmount => {
				donation.getAmountForThisMonth().then(amountForThisMonth => {
					donation.getTopDonator(maxAmount).then(topDonator => {
						donation.sumAmount().then(amount => {
							donation.getInformationForChart().then(dataForChart => {
								donation.selectDataForPage(perPage, page).then(donations => {
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

	donation.insertData(donationInfo);
	res.redirect("/page=1");
}

exports.redirectToFirstPage = (req, res) => {
	res.redirect("/page=1");
}
