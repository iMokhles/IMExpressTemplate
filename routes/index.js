let express = require("express");
let router = express.Router();

let webRouter = require('./web');
let usersRouter = require('./users');
let authRouter = require('./auth');

router.use("/", authRouter);
router.use("/", webRouter);
router.use("/users", usersRouter);

module.exports = router;