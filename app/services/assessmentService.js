const Assessment = require('../models/assessmentModels/assessmentModel');
const Teacher = require('../models/userModels/teacherModel');
const Student = require('../models/userModels/studentModel');
const Question = require('../models/assessmentModels/questionsModel');
const ULID = require('ulid');
const ResourceExists = require('../errors/ResourceExists');
const { generateAccessCode } = require('../utilities/generateRandomToken');
const createRandomID = require('../utilities/generateId');

// const questions = require('../../storage/database/data');

async function sendAssessment(assessmentData) {
  const existingTeacher = await Teacher.findOne({ id: assessmentData.teacher_id });

  if (!existingTeacher) {
    throw new ResourceExists('User details does not exist');
  }

  const teacherName = `${existingTeacher.first_name} ${existingTeacher.last_name}`
  const accessCode = await generateAccessCode();

  const newAssessment = await Assessment.create({
    id: createRandomID(),
    subject: assessmentData.subject,
    teacher_id: assessmentData.teacher_id,
    code: accessCode,
    time_for_test: assessmentData.time_for_test,
  });

  let questions = assessmentData.questions;

  const questionDocuments = questions.map(question => ({
    ...question,
    assessment_id: newAssessment._id,
  }));

  const savedQuestions = await Question.insertMany(questionDocuments)

  const data = {
    id: newAssessment.id,
    assessmentSubject: newAssessment.subject,
    teacherId: newAssessment.teacher_id,
    teacherName: teacherName,
    accessCode: newAssessment.code,
    timeForTest: newAssessment.time_for_test,
    questions: savedQuestions
  }

  return data;
}

module.exports = {
    sendAssessment
}