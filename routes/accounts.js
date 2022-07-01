const { Account, validate } = require('../models/account');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  let account = new Account(_.pick(req.body, ['account_name']));
  await account.save();

  res.send(account);
});

module.exports = router;
