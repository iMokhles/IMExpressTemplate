const mailer = require('../helpers/mailer');
const config = require("config");
const date = require('../helpers/date');
const User = require('../models/user');
const UserPasswordReset = require('../models/userPasswordReset');


/**
 *
 * @param {User} user
 * @param {string} reset_token
 * @param {string} link
 * @returns {Promise<T|never>}
 */
function sendEmail(user, reset_token, link) {
    return mailer.sendEmail({
        template: 'single_action',
        recipient: user.email,
        locals: {
            subject: '['+config.get('APP_NAME')+'] Reset Password',
            app_name: config.get('APP_NAME'),
            date: date.getFormattedNow('ddd DD MMMM YYYY'),
            time: date.getFormattedNow('HH:mm'),
            title: 'Reset Password',
            message: 'You are receiving this email because we received a password reset request for your account.',
            button_title: 'Reset!',
            button_link: link,
            under_button: 'If you did not request a password reset, no further action is required.',
            facebook_link: config.get('FACEBOOK_URL'),
            twitter_link: config.get('TWITTER_URL'),
            youtube_link: config.get('YOUTUBE_URL'),
            copyright_text: 'Copyright '+date.getFormattedNow('YYYY')+' '+config.get('APP_NAME')+', all rights reserved'
        }
    });
}
/**
 *
 * @param {User} user
 * @param {string} reset_token
 * @param {string} link
 * @returns {Promise<T|never>}
 */
function handle(user, reset_token, link) {

    // find reset object
    return UserPasswordReset.findOne({ where: {email: user.email} }).then(userPasswrdReset => {
        if (userPasswrdReset) {
            // if found ( update the current one )
            userPasswrdReset.destroy();
            UserPasswordReset.create({ token: reset_token, email: user.email, createdAt: date.getFormattedNow() }).then(userPasswrdReset => {
                if (userPasswrdReset) {
                    return sendEmail(user, reset_token, link);
                }
            });
        } else {
            // if not found ( create new object )
            UserPasswordReset.create({ token: reset_token, email: user.email, createdAt: date.getFormattedNow() }).then(userPasswrdReset => {
                if (userPasswrdReset) {
                    return sendEmail(user, reset_token, link);
                }
            });
        }
    });
}
module.exports = handle;