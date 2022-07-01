const Joi = require('joi');
const mongoose = require('mongoose');

const Account = mongoose.model(
  'Account',
  new mongoose.Schema({
    account_name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateAccount(account) {
  const schema = {
    account_name: Joi.string().min(4).max(20).required(),
  };

  return Joi.validate(account, schema);
}

exports.Account = Account;
exports.validate = validateAccount;
