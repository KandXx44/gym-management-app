const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/', memberController.getAllMembers);
router.get('/search', memberController.searchMember);
router.post('/', memberController.createMember);
router.get('/:id', memberController.getMember);
router.put('/:id', memberController.editMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;
