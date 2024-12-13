const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployee);
router.put('/:id', employeeController.editEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
