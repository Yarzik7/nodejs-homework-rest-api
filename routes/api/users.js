const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require('../../utils/validation/userValidationSchemas');
const {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateSubscriptionController,
  updateAvatarController
} = require('../../controllers/auth');

const router = express.Router();

router.patch('/', authenticate, validateBody(updateSubscriptionSchema), updateSubscriptionController);
router.post('/register', validateBody(registerSchema), registerController);
router.post('/login', validateBody(loginSchema), loginController);
router.get('/current', authenticate, getCurrentController);
router.post('/logout', authenticate, logoutController);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatarController);

module.exports = router;
