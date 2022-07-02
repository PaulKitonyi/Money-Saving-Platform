const { Saving, validate } = require('../models/saving');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const today = new Date().toISOString().split('T')[0];

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  saving = new Saving(_.pick(req.body, ['amount', 'description', 'account']));
  await saving.save();

  res.send(saving);
});

module.exports = router;
