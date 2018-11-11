var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var isLoggedIn;
    isLoggedIn = (req.session.user && req.cookies.session_xid);
    res.render('welcome', { title: 'ExpressJS', authenticated: isLoggedIn});
});

module.exports = router;
