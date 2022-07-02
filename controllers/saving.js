const { Saving, validate } = require('../models/saving');
const _ = require('lodash');

exports.createSaving = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let saving = new Saving(
    _.pick(req.body, ['amount', 'description', 'account'])
  );

  await saving.save();

  res.send(saving);
};

exports.getSavings = async (req, res) => {
  res.send(res.paginatedResults);
};
