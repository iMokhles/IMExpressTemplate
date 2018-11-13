var mailer = require('../helpers/mailer');
var config = require("config");
var moment = require('moment');
var User = require('../models/user');

/**
 *
 * @param {User} user
 * @param {string} act_token
 * @param {string} link
 * @returns {Promise<T|never>}
 */
function handle(user, act_token, link) {

    user.verificationToken = act_token;
    user.save().then(() => {});
    return mailer.sendEmail({
        template: 'single_action',
        recipient: user.email,
        locals: {
            subject: '['+config.get('APP_NAME')+'] Verify Email Address',
            app_name: config.get('APP_NAME'),
            date: moment().format('ddd DD MMMM YYYY'),
            time: moment().format('HH:mm'),
            title: 'Verify Email Address',
            message: 'Please click the button below to verify your email address.',
            button_title: 'Verify Now!',
            button_link: link,
            under_button: 'If you did not create an account, no further action is required.',
            facebook_link: config.get('FACEBOOK_URL'),
            twitter_link: config.get('TWITTER_URL'),
            youtube_link: config.get('YOUTUBE_URL'),
            copyright_text: 'Copyright '+moment().format('YYYY')+' '+config.get('APP_NAME')+', all rights reserved'
        }
    });
}
module.exports = handle;