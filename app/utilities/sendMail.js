const nodemailer = require("nodemailer");
// const url = require("url");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

async function sendEmail(email, subject, payload, templateFile) {
    try {
        const transporter = nodemailer.createTransport({
          service: process.env.NODEMAILER_SERVICE,
          host: process.env.NODEMAILER_HOST,
          port: process.env.NODEMAILER_PORT,
          secure: false,
          auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_APP_PASSWORD,
          },
        });

        const source = fs.readFileSync(path.join(__dirname, templateFile), 'utf8');
        const compiledTemplate = handlebars.compile(source);
        const mailOptions = {
            from: {
                name: "MyQuizPal",
                address: process.env.NODEMAILER_USER,
            },
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("mail info", info);
                return res.status(200).json({
                    success: true,
                })
            }
        })
    } catch (error) {
        console.log("mail error", error);
    }
}

module.exports = {
    sendEmail
}