const express = require('express');
const router = express.Router();
const validateAdmin = require('../middlewares/authenticationMiddlewares/registerAdminValidator');
const validateAdminTeacher = require('../middlewares/authenticationMiddlewares/addTeacherValidator');
const authController = require('../controllers/authenticationController');
const registerStudentValidator = require('../middlewares/authenticationMiddlewares/registerStudentValidator');
const loginValidator = require('../middlewares/authenticationMiddlewares/loginValidator');
const resetPasswordValidator = require('../middlewares/authenticationMiddlewares/resetPasswordValidator');
const passwordChangeValidator = require('../middlewares/authenticationMiddlewares/passwordChangeValidator');

// endpoint to register an admin/representative of a school or organisation
router.post(
  '/api/register/admin',
  validateAdmin,
  authController.createNewAdmin
);

// endpoint to register a teacher outside an organization
router.post(
  '/api/register/teacher',
  validateAdminTeacher,
  authController.createNewTeacher
);

// endpoint to register a student
router.post(
  '/api/register/student',
  registerStudentValidator,
  authController.createNewStudent
);

// endpoint to login users
router.post('/api/login', loginValidator, authController.userLoginRequest);

// endpoint for an admin to add a teacher
// TODO: implement sending login details to the teacher being added
router.post(
  '/api/add-teacher',
  validateAdminTeacher,
  authController.addNewTeacher
);

// endpoint to initialize password reset
router.post(
  '/api/reset-password',
  resetPasswordValidator,
  authController.passwordResetRequest
);

// endpoint to resend password token
router.post('/api/reset-password/resend', authController.resendTokenRequest);

// Endpoint to verify token
router.put('/api/reset-password/verify', authController.tokenValidateRequest);

// endpoint to finally reset the password
router.put(
  '/api/reset-password',
  passwordChangeValidator,
  authController.updatePasswordRequest
);

module.exports = router;
