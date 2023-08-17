const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const upadateSubscriptionUser = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required()
});


module.exports = { registerSchema, loginSchema, upadateSubscriptionUser };
