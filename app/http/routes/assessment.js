const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authenticationMiddlewares/authMiddleware');
const validatePostAssessment = require('../middlewares/assessmentMiddlewares/postAssessmentValidator');
const validateGetAssessment = require('../middlewares/assessmentMiddlewares/getAssessmentValidator');
const validateSendAssessmentCode = require('../middlewares/assessmentMiddlewares/sendAssessmentMailValidator');
const validateStudentCode = require('../middlewares/assessmentMiddlewares/getStudentAssessmentValidator');
const validateUpdateAssessment = require('../middlewares/assessmentMiddlewares/updateAssessmentValidator');
const assessmentController = require('../controllers/assessmentController');

// Create a new assessment
router.post(
  '/api/assessment/create',
  authMiddleware,
  validatePostAssessment,
  assessmentController.postAssessment
);

// Get One Assessment using Assessment Id
router.get(
  '/api/assessment/:assessment_id',
  authMiddleware,
  validateGetAssessment,
  assessmentController.getAssessment
);

// Get All Assessments of A Teacher
router.get(
  '/api/assessments',
  authMiddleware,
  validateGetAssessment,
  assessmentController.getAllAssessments
);

// send assessment code to student
router.post(
  '/api/assessment/send-code',
  authMiddleware,
  validateSendAssessmentCode,
  assessmentController.sendAccessCodeToStudent
);

// get assessment using student code
router.get(
  '/api/assessment/student/:student_id',
  authMiddleware,
  validateStudentCode,
  assessmentController.getAssessmentByCode
);

// update assessment/questions
router.put(
  '/api/assessment/:assessment_id',
  authMiddleware,
  validateUpdateAssessment,
  assessmentController.updateAssessmentDetails
);

module.exports = router;
