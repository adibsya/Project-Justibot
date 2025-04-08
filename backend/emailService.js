const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (to, link) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Verifikasi Akun Anda",
        html: `<p>Klik link berikut untuk verifikasi akun Anda:</p>
               <a href="${link}">Verifikasi Akun</a>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
