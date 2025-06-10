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
        subject: "Selamat Datang di Justibot - Verifikasi Akun Anda",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #731D2C; text-align: center;">Selamat Datang di Justibot! 🎉</h1>
                <p style="color: #333; font-size: 16px; line-height: 1.5;">
                    Terima kasih telah mendaftar di platform Justibot. Kami senang Anda bergabung dengan komunitas kami!
                </p>
                <p style="color: #333; font-size: 16px; line-height: 1.5;">
                    Untuk melanjutkan perjalanan Anda bersama kami dan mengakses semua fitur yang tersedia, mohon verifikasi akun Anda dengan mengklik tombol di bawah ini:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${link}" style="background-color: #731D2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Verifikasi Akun Saya
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    Jika Anda tidak merasa mendaftar di Justibot, Anda dapat mengabaikan email ini.
                </p>
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    © 2025 Justibot. Semua hak dilindungi undang-undang.
                </p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (to, link) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Reset Password Akun Justibot Anda",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #731D2C; text-align: center;">Reset Password</h1>
                <p style="color: #333; font-size: 16px; line-height: 1.5;">
                    Kami menerima permintaan untuk mengatur ulang password akun Justibot Anda. 
                    Jangan khawatir, kami di sini untuk membantu Anda!
                </p>
                <p style="color: #333; font-size: 16px; line-height: 1.5;">
                    Untuk membuat password baru, silakan klik tombol di bawah ini:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${link}" style="background-color: #731D2C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Atur Ulang Password
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    Link ini hanya berlaku selama 1 jam. Jika Anda tidak meminta reset password, 
                    mohon abaikan email ini atau hubungi tim support kami.
                </p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="color: #666; font-size: 14px; margin: 0;">
                        Demi keamanan akun Anda:
                        <ul style="color: #666; font-size: 14px;">
                            <li>Jangan bagikan link ini dengan siapapun</li>
                            <li>Pilih password yang kuat dan unik</li>
                        </ul>
                    </p>
                </div>
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    © 2025 Justibot. Semua hak dilindungi undang-undang.
                </p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail
};
