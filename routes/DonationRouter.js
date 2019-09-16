/**
 * Variable for access to router
 * 
 * @type {object} router
 */
const router = require('./Router');

/**
 * Variable for access to controller
 * 
 * @type {object} donationController
 */
const donationController = require("../controllers/donationController.js");

/**
 * Variable for access to donation router
 * 
 * @type {object} donationRouter
 */
const donationRouter = router.createRouter();

/**
 * Methods that create routing
 */
donationRouter.use("/donate", donationController.renderDonatePage);
donationRouter.use("/page=:page", donationController.renderDashboardPage);
donationRouter.use("/toDonate", donationController.receivingDonationData);
donationRouter.use("/", donationController.redirectToFirstPage);
donationRouter.use('*', donationController.renderErrorPage);

module.exports = donationRouter;
