const router = require('./Router');
const donationController = require("../controllers/donationController.js");

const donationRouter = router.createRouter();

donationRouter.use("/donate", donationController.renderDonatePage);
donationRouter.use("/page=:page", donationController.renderDashboardPage);
donationRouter.use("/toDonate", donationController.receivingDonationData);
donationRouter.use("/", donationController.redirectToFirstPage);
donationRouter.use('*', donationController.renderErrorPage);

module.exports = donationRouter;
