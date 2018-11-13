const kernel = require('../../kernel');
const config = require("config");
const string = require('../../../helpers/string');
const verifyEmailNotification = require('../../../notifications/VerifyEmailNotification');
const generateRouteLink = require('../../../helpers/string').generateRouteLink;

const redirectTo = '/home';

function getVerifyPage(req, res) {
    res.locals.session = req.session;
    res.locals.user = req.session.user;
    res.render('auth/verify', {
        title: config.get('APP_NAME')
    });
}

function postVerify(req, res) {
// TODO: verify email
}

function postResend(req, res) {
    res.locals.session = req.session;
    res.locals.user = req.session.user;

    User.findOne({ where: {email: req.session.user.email} }).then(user => {
        if (user.emailVerifiedAt !== null) {
            // already verified
            res.redirect(redirectTo);
        } else {
            // send verification email
            const verificationToken = string.randomString(100);
            const verificationLink = generateRouteLink(req, 'email/verify/'+verificationToken);
            user.update({
                verificationToken: verificationToken
            }).then((user) => {
                if (user) {
                    verifyEmailNotification(user, verificationToken, verificationLink)
                        .then(result => {
                            req.session.resent = true;
                            res.redirect('back');
                        }).catch(error => {
                        console.log(error);
                        req.session.resent = false;
                        res.redirect('back');
                    });
                } else {
                    req.session.resent = false;
                    res.redirect('back');
                }
            });


        }
    });
}

module.exports.getVerifyPage = [kernel.session_middleware, kernel.auth_middleware, getVerifyPage];
module.exports.postVerify = [kernel.throttle_middleware(6, 1), postVerify];
module.exports.postResend = [kernel.throttle_middleware(6, 1), postResend];