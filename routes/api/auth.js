const express = require('express');
const { validateBody } = require('../../middlewares');
const { registerSchema, loginSchema } = require('../../utils/validation/userValidationSchemas');
const { registerController, loginController } = require('../../controllers/auth');

const router = express.Router();

router.post('/register', validateBody(registerSchema), registerController);
router.post('/login', validateBody(loginSchema), loginController);

module.exports = router;
