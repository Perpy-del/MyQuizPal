const express = require('express');
const router = express.Router();
const validateAdmin = require('../../http/middlewares/registerAdminValidator')
const validateAdminTeacher = require('../middlewares/addTeacherValidator')
const authController = require('../controllers/authenticationController');

router.post('/api/register/admin', validateAdmin, authController.createNewAdmin);
router.post('/api/add-teacher', validateAdminTeacher, authController.addNewTeacher);

module.exports = router;
