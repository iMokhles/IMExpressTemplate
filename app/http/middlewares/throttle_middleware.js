const rateLimit = require("express-rate-limit");
const limiter_middleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
module.exports = limiter_middleware;
