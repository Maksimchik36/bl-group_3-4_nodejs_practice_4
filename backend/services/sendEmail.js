const nodemailer = require("nodemailer");

module.exports = async ({ userName, userEmail, userText }) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.meta.ua",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "yerimjunior@meta.ua",
        pass: "Yerim5Junior",
      },
    });

    const letter = `
      You have email from: ${userName}. 
      Contact email: ${userEmail}.
      Message: ${userText}.
    `;
    const options = {
      from: "yerimjunior@meta.ua", // sender address
      to: "art777vasss@gmail.com", // list of receivers
      subject: "Galaxy big bang theory!", // Subject line
      text: userText, // plain text body
      html: letter, // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(options);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return true;
  } catch (error) {
    console.log(error.message);
  }
};
