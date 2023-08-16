const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamp: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
