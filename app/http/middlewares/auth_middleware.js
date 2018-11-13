// add this for pages request a logged in user
function handle(req, res, next) {
    // Implement the middleware function based on the options object
    if (req.session.user && req.cookies.session_xid) {
        if (req.session.user.emailVerifiedAt !== null) {
            res.locals.session = req.session;
            res.locals.user = req.session.user;
            next();
        } else {
            res.locals.session = req.session;
            res.locals.user = req.session.user;
            return res.redirect('/verify');
        }
    }
    res.locals.session = null;
    res.locals.user = null;
    return res.redirect('/login');
}

module.exports = handle;