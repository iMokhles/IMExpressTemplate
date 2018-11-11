function handle(req, res, next) {
    // Implement the middleware function based on the options object
    if (req.session.user && req.cookies.session_xid) {
        next();
    }
    return res.redirect('/login');
}

module.exports = handle;