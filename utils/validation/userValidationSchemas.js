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

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required().messages({ 'any.required': 'missing required field email' }),
});


module.exports = { registerSchema, loginSchema, updateSubscriptionSchema, emailSchema };
