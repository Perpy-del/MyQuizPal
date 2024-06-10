const express = require('express');
const router = express.Router();
const validateAdmin = require('../../http/middlewares/registerAdminValidator')
const validateAdminTeacher = require('../middlewares/addTeacherValidator')
const authController = require('../controllers/authenticationController');
const registerStudentValidator = require('../middlewares/registerStudentValidator');
const loginValidator = require('../middlewares/loginValidator');

router.post('/api/register/admin', validateAdmin, authController.createNewAdmin);
router.post('/api/register/teacher', validateAdminTeacher, authController.createNewTeacher);
router.post('/api/register/student', registerStudentValidator, authController.createNewStudent);
router.post('/api/login/teacher', loginValidator, authController.teacherLoginRequest);
router.post('/api/add-teacher', validateAdminTeacher, authController.addNewTeacher);

module.exports = router;
