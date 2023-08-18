const nodemailer = require('nodemailer')

const { META_PASS } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'yaroslav.chaplinskyi@meta.ua',
    pass: META_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  const email = { ...data, from: 'yaroslav.chaplinskyi@meta.ua' };
  await transport.sendMail(email);
  return true;
};

module.exports = {sendEmail};
