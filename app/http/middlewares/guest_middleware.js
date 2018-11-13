// add this for authentication pages only
function handle(req, res, next) {
    // Implement the middleware function based on the options object
    if (req.session.user && req.cookies.session_xid) {
        if (req.session.user.emailVerifiedAt !== null) {
            res.locals.session = req.session;
            res.locals.user = req.session.user;
            return res.redirect('/home');
        } else {
            res.locals.session = req.session;
            res.locals.user = req.session.user;
            return res.redirect('/verify');
        }
    } else {
        res.locals.session = null;
        res.locals.user = null;
        next();
    }
}

module.exports = handle;