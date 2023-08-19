const { BASE_URL } = process.env;

const getVerifyEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };
};

module.exports = getVerifyEmail;