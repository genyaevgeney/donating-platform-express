const app = require("./server.js");
const router = require('./routes/Router');

router.configureServer();
app.startServer();
