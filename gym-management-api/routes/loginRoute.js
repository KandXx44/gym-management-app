const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', loginController.login);
router.get('/check/:user_id', loginController.check);  // Corrected route
router.post('/logout', loginController.logout);

module.exports = router;