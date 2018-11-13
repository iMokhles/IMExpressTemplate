const createError = require('http-errors');
const config = require("config");
const kernel = require('../../kernel');
const string = require('../../../helpers/string');
const resetPasswordNotification = require('../../../notifications/ResetPasswordNotification');
const User = require('../../../models/user');
const generateRouteLink = require('../../../helpers/string').generateRouteLink;

function getLinkRequestForm(req, res) {
    res.locals.session = req.session;
    res.render('auth/password/email', {
        title: config.get('APP_NAME'),
    });
}

function postResetLinkEmail(req, res) {
    console.log("postResetLinkEmail 1");
    User.findOne({ where: {email: req.body.email} }).then(user => {
        console.log("postResetLinkEmail 2");
        if (!user) {
            // return error
            console.log("postResetLinkEmail 3");
            req.session.status_msg = 'We can\'t find a user with that e-mail address.';
            req.session.status_type = 'danger';
            res.redirect('back');
        } else {
            console.log("postResetLinkEmail 4");
            const resetToken = string.randomString(100);
            const resetLink = generateRouteLink(req, 'password/reset/'+resetToken);
            resetPasswordNotification(user, resetToken, resetLink)
                .then(result => {
                    req.session.status_msg = 'We have e-mailed your password reset link!, this link valid for 20 minutes only.';
                    req.session.status_type = 'success';
                    res.redirect('back');
                }).catch(error => {
                console.log(error);
            });
        }
    });

}

module.exports.getLinkRequestForm = [kernel.session_middleware, kernel.guest_middleware, getLinkRequestForm];
module.exports.postResetLinkEmail = postResetLinkEmail;
