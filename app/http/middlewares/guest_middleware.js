function handle(req, res, next) {
    // Implement the middleware function based on the options object
    if (req.session.user && req.cookies.session_xid) {
        return res.redirect('/home');
    }
    next();
}

module.exports = handle;