const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    from: "Slickos del Slicos <slicko@example.com>",
    to: "orders@example.com",
    subject: "New Order",
    html: `<p>Your Pizza order is ready!</p>`,
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
