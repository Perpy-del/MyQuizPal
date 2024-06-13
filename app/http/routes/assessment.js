const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const validatePostAssessment = require('../middlewares/postAssessmentValidator');

const assessmentController = require('../controllers/assessmentController');

router.post('/api/assessment/create', authMiddleware, validatePostAssessment, assessmentController.postAssessment);

module.exports = router;