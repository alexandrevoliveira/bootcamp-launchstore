const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "40a63b8eaa1dcd",
      pass: "34f7e96dbcbd7f"
    }
  })