const Joi = require('joi');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const Saving = mongoose.model(
  'Saving',
  new mongoose.Schema(
    {
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 255,
      },
      account: {
        type: ObjectId,
        ref: 'Account',
        required: true,
      },
    },
    { timestamps: true }
  )
);

function validateSaving(saving) {
  const schema = {
    amount: Joi.number().required(),
    description: Joi.string(),
  };

  return Joi.validate(saving, schema);
}

exports.Saving = Saving;
exports.validate = validateSaving;
