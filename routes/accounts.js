const express = require('express');
const router = express.Router();
const { createAccount } = require('../controllers/account');

router.post('/create-account', createAccount);

module.exports = router;
