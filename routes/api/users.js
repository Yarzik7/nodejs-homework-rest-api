const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const {
  registerSchema,
  loginSchema,
  upadateSubscriptionSchema,
} = require('../../utils/validation/userValidationSchemas');
const {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  upadateSubscriptionController,
} = require('../../controllers/auth');

const router = express.Router();

router.patch('/', authenticate, validateBody(upadateSubscriptionSchema), upadateSubscriptionController);
router.post('/register', validateBody(registerSchema), registerController);
router.post('/login', validateBody(loginSchema), loginController);
router.get('/current', authenticate, getCurrentController);
router.post('/logout', authenticate, logoutController);

module.exports = router;
