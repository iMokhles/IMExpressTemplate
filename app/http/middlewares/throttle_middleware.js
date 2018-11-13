const rateLimit = require("express-rate-limit");

function throttle(maxAttempts, decayMinutes) {
    return rateLimit({
        windowMs: decayMinutes * 60 * 1000, // 15 minutes
        max: maxAttempts // limit each IP to 100 requests per windowMs
    });
}
module.exports = throttle;
