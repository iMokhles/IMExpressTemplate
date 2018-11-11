let express = require("express");
let router = express.Router();

let webRouter = require('./web');
let usersRouter = require('./users');

router.use("/", webRouter);
router.use("/users", usersRouter);

module.exports = router;