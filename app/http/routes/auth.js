const express = require('express');
const router = express.Router();
const validateAdmin = require('../../http/middlewares/registerAdminValidator')
const validateAdminTeacher = require('../middlewares/addTeacherValidator')
const authController = require('../controllers/authenticationController');
const registerStudentValidator = require('../middlewares/registerStudentValidator');
const loginValidator = require('../middlewares/loginValidator');
const resetPasswordValidator = require('../middlewares/resetPasswordValidator');
const passwordChangeValidator = require('../middlewares/passwordChangeValidator');

router.post('/api/register/admin', validateAdmin, authController.createNewAdmin);
router.post('/api/register/teacher', validateAdminTeacher, authController.createNewTeacher);
router.post('/api/register/student', registerStudentValidator, authController.createNewStudent);
router.post('/api/login', loginValidator, authController.userLoginRequest);
router.post('/api/add-teacher', validateAdminTeacher, authController.addNewTeacher);
router.post('/api/reset-password', resetPasswordValidator, authController.passwordResetRequest);
router.post('/api/reset-password/resend', authController.resendTokenRequest);
router.put('/api/reset-password/verify', authController.tokenValidateRequest);
router.put('/api/reset-password', passwordChangeValidator, authController.updatePasswordRequest);

module.exports = router;
