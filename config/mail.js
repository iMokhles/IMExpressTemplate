const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io", // smtp.ethereal.email
    port: 2525, // 587
    secure: false,
    auth: {
        user: "e7fbe7880b665c", // vstqiob3effgiouw@ethereal.email
        pass: "38f008316d474c", // Vv3asjmc1d2TTPwr9P
    }
});

module.exports = transporter;
