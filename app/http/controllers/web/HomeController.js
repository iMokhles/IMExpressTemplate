var kernel = require('../../kernel');
var config = require("config");

function getIndexPage(req, res) {
    res.render('welcome', {
        title: config.get('APP_NAME')
    });
}
function getHomePage(req, res) {
    var isLoggedIn;
    isLoggedIn = (req.session.user && req.cookies.session_xid);
    res.render('home', {
        title: config.get('APP_NAME'),
        authenticated: isLoggedIn,
        user: (isLoggedIn === true) ? req.session.user : null,
        session: req.session
    });
}

module.exports.getIndexPage = getIndexPage;
module.exports.getHomePage = [kernel.auth_middleware, getHomePage];