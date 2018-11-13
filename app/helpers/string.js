const chance = require('chance').Chance();

/**
 *
 * @param length
 * @returns {String|*}
 */
function randomString(length) {
    return chance.string({ length: length, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' })
}

/**
 *
 * @param req
 * @param path
 * @returns {string}
 */
function generateRouteLink(req, path) {
    return req.protocol + '://' + req.headers.host + '/'+path;
}
module.exports.randomString = randomString;
module.exports.generateRouteLink = generateRouteLink;