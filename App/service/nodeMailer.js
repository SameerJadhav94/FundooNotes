const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path:'../../.env'})

exports.sendEmail = (messageMail) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            mail: process.env.EMAIL,
            password: process.env.PASSWORD
        }
    })

    const message = {
        from: process.env.EMAIL,
        to: messageMail.email,
        subject: `Recovery code`,

    }

    transporter.sendMail(message, (err, result) => {
        if (err) {
            return err
        }
        else {
            return result.response
        }
    })
}