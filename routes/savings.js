const { Saving } = require('../models/saving');
const express = require('express');
const router = express.Router();
const { paginatedResults } = require('../lib/pagination');
const { createSaving, getSavings } = require('../controllers/saving');

router.post('/save', createSaving);

router.get('/savings', paginatedResults(Saving), getSavings);

module.exports = router;
