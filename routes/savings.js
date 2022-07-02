const { Saving } = require('../models/saving');
const express = require('express');
const router = express.Router();
const { paginatedResults } = require('../lib/pagination');
const {
  createSaving,
  getSavings,
  exportSavings,
} = require('../controllers/saving');

router.post('/save', createSaving);
router.get('/savings', paginatedResults(Saving), getSavings);
router.get('/savings/downloadExcel', exportSavings);

module.exports = router;
