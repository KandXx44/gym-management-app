const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get user profile by ID
router.get('/:id', userController.getUserProfile);
router.put('/:id', userController.updateUserProfile);
router.get('/admin/:id', userController.getAdminProfile);
router.post('/sign-up-course', userController.signUpCourse);
router.get('/courses/:id', userController.getCourses);
router.delete('/:id', userController.dropCourse);

module.exports = router;

