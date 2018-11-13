const config = require("config");
const moment = require('moment');
const bcrypt = require('bcrypt');
const kernel = require('../../kernel');
const UserPasswordReset = require('../../../models/userPasswordReset');
const date = require('../../../helpers/date');
const User = require('../../../models/user');

const redirectTo = '/login';

function getResetForm(req, res) {
    // set session
    res.locals.session = req.session;
    // get token from link
    const resetToken = req.params.token;
    // find Reset Object
    UserPasswordReset.findOne({
        where: {
            token: resetToken
        }
    }).then(userPasswrdReset => {

        // found object
        if (userPasswrdReset) {

            const a = moment(userPasswrdReset.createdAt);
            const b = moment(date.getFormattedNow());
            const twoHoursAgo = b.subtract(config.get('RESET_PASSWORD_MAX_MINUTES'), 'minutes');
            if (twoHoursAgo.isAfter(a)) {
                req.params = null;
                res.redirect('/home');
            } else {
                res.render('auth/password/reset', {
                    title: config.get('APP_NAME'),
                    token: resetToken,
                    email: req.params.email,
                });
            }
        } else {
            req.params = null;
            res.redirect('/home');
        }
    });
}

function postReset(req, res) {
    const resetToken = req.body.token;
    const email = req.body.email;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;

    // check if passwords matches
    if (password === password_confirmation) {
        if (password.length >= 6) {
            User.findOne({ where: {email: email} }).then(user => {
                console.log("postResetLinkEmail 2");
                if (user) {

                    bcrypt.compare(password, user.password).then(function(result) {
                        if (!result) {
                            UserPasswordReset.findOne({ where: {email: email, token: resetToken} }).then(userPasswrdReset => {
                                if (userPasswrdReset) {
                                    // update user now
                                    user.update({
                                        password: password
                                    }).then((user) => {
                                        if (user) {
                                            userPasswrdReset.destroy();
                                            req.session.reset_status_msg = 'Your password updated successfully, you can login now with your new password.';
                                            req.session.reset_status_type = 'success';
                                            res.redirect('back');
                                        } else {
                                            req.session.reset_status_msg = 'Failed to update your password, try again later!';
                                            req.session.reset_status_type = 'danger';
                                            res.redirect('back');
                                        }
                                    });
                                } else {
                                    req.params = null;
                                    req.body = null;
                                    res.redirect('/home');
                                }
                            });
                        } else {
                            req.session.reset_status_msg = 'You cannot use your current password.';
                            req.session.reset_status_type = 'danger';
                            res.redirect('back');
                        }
                    });
                } else {
                    req.session.reset_status_msg = 'We can\'t find a user with that e-mail address.';
                    req.session.reset_status_type = 'danger';
                    res.redirect('back');
                }
            });
        } else {
            req.session.reset_status_msg = 'Passwords shouldn\'t be less than 6 characters';
            req.session.reset_status_type = 'danger';
            res.redirect('back');
        }
    } else {
        req.session.reset_status_msg = 'Passwords don\'t match';
        req.session.reset_status_type = 'danger';
        res.redirect('back');
    }
}
module.exports.getResetForm = [kernel.session_middleware, kernel.guest_middleware, getResetForm];
module.exports.postReset = postReset;
