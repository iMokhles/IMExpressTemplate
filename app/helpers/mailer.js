var mailTransporter = require('../../config/mail');
var Email = require('email-templates');
var path = require('path');

var mailer = new Email({
    views: { root: path.resolve(__dirname, '../../resources/mails') },
    message: {
        from: 'im_express@mail.com',
    },
    transport: mailTransporter,
    send: true,
    juice: true,
    juiceResources: {
        webResources: {
            relativeTo: path.join(__dirname, '../../public')
        }
    },
});

/**
 *
 * @param options
 * @returns {Promise<T | never>}
 */
function sendEmail(options) {
    if (typeof options !== 'object') {
        throw new Error('Invalid parameters')
    }
    if (!options.template) {
        throw new Error('Template is missing')
    }
    if (!options.recipient) {
        throw new Error('Target emails are missing')
    }
    if (!options.locals || typeof options.locals !== 'object') {
        throw new Error('Email parameters are missing')
    }
    return mailer.send({
        template: options.template,
        message: {
            to: options.recipient
        },
        locals: options.locals
    });
}
module.exports.sendEmail = sendEmail;