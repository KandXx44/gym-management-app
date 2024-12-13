const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/totals', adminController.getTotals);

module.exports = router;