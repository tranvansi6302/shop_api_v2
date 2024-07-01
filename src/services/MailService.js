const nodemailer = require('nodemailer')
class MailService {
    constructor() {
        this.initTransporter()
    }

    initTransporter() {
        this.tranformer = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'it.sitranvan@gmail.com',
                pass: 'ohxo mwnb fxjw pjxk'
            }
        })
    }

    async sendMail(to, subject, text, html) {
        this.tranformer.sendMail({
            from: 'it.sitranvan@gmail.com',
            to,
            subject,
            text,
            html
        })
    }
}

const emailService = new MailService()
module.exports = emailService
