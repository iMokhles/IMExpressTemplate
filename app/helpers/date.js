const moment = require('moment');

/**
 *
 * @param format
 * @returns {string}
 */
function getFormattedNow(format = 'YYYY-MM-DD HH:mm:ss') {
    return moment().format(format);
}
module.exports.getFormattedNow = getFormattedNow;