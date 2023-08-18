const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  emailSchema,
} = require('../../utils/validation/userValidationSchemas');
const {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateSubscriptionController,
  updateAvatarController,
  verifyEmailController,
  resendVerifyEmail,
} = require('../../controllers/auth');

const router = express.Router();

router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscriptionController);
router.post('/register', validateBody(registerSchema), registerController);
router.get('/verify/:verificationToken', verifyEmailController);
router.post('/verify', validateBody(emailSchema), resendVerifyEmail);
router.post('/login', validateBody(loginSchema), loginController);
router.get('/current', authenticate, getCurrentController);
router.post('/logout', authenticate, logoutController);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatarController);

module.exports = router;
