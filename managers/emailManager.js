const nodemailer =require('nodemailer');
const emailManager = async (to,text,html,subject)=>{
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "2b3385495d5f22",
          pass: "ab05764117ed57"
        }
      });
  
     await transport.sendMail({
        from: "info@expense-tracker-app.com",
        to: to,
        subject:subject,
        text: text,
        html:html
      });
}

module.exports = emailManager;