const Assessment = require('../models/assessmentModels/assessmentModel');
const Teacher = require('../models/userModels/teacherModel');
const Student = require('../models/userModels/studentModel');
const Question = require('../models/assessmentModels/questionsModel');
const ULID = require('ulid');
const ResourceExists = require('../errors/ResourceExists');
const { generateAccessCode } = require('../utilities/generateRandomToken');
const createRandomID = require('../utilities/generateId');
const mailService = require('../utilities/sendMail');

// const questions = require('../../storage/database/data');

async function sendAssessment(assessmentData) {
  const existingTeacher = await Teacher.findOne({
    id: assessmentData.teacherId,
  });

  if (!existingTeacher) {
    throw new ResourceExists('User details does not exist');
  }

  const teacherName = `${existingTeacher.first_name} ${existingTeacher.last_name}`;
  const accessCode = await generateAccessCode();

  const newAssessment = await Assessment.create({
    id: createRandomID(),
    subject: assessmentData.subject,
    teacher_id: assessmentData.teacherId,
    code: accessCode,
    time_for_test: assessmentData.timeForTest,
  });

  let questions = assessmentData.questions;

  const questionDocuments = questions.map(question => ({
    ...question,
    assessment_id: newAssessment._id,
  }));

  const savedQuestions = await Question.insertMany(questionDocuments);

  const data = {
    id: newAssessment.id,
    assessmentSubject: newAssessment.subject,
    teacherId: newAssessment.teacher_id,
    teacherName: teacherName,
    accessCode: newAssessment.code,
    timeForTest: newAssessment.time_for_test,
    questions: savedQuestions,
    createdAt: newAssessment.createdAt,
    updatedAt: newAssessment.updatedAt,
  };

  return data;
}

async function retrieveAssessmentByTeacher(assessmentId, teacherId) {
  const existingTeacher = await Teacher.findOne({ id: teacherId });

  if (!existingTeacher) {
    throw new ResourceExists('User details does not exist');
  }

  const existingAssessment = await Assessment.findById({ _id: assessmentId });

  const assessmentQuestions = await Question.find({
    assessment_id: existingAssessment._id,
  });

  const data = {
    subject: existingAssessment.subject,
    dateCreated: existingAssessment.updatedAt,
    questions: assessmentQuestions,
  };

  return data;
}

async function retrieveAllAssessments(teacherId) {
  const existingTeacher = await Teacher.findOne({ id: teacherId });

  if (!existingTeacher) {
    throw new ResourceExists('User details does not exist');
  }

  const teacherAssessments = await Assessment.find({
    teacher_id: teacherId,
  }).populate({
    path: 'questions', // Path to populate
    model: 'Question', // Model to use for population
  });

  return teacherAssessments;
}

async function sendAssessmentCode(teacherId, email) {
  const existingTeacher = await Teacher.findOne({ id: teacherId });
  const existingStudent = await Student.findOne({ email: email });

  if (!existingTeacher) {
    throw new ResourceExists('User details does not exist');
  }

  if (!existingStudent) {
    throw new ResourceExists('Student details does not exist');
  }

  const existingAssessment = await Assessment.findOne({
    teacher_id: teacherId,
  });

  const { first_name, last_name } = existingStudent;

  await mailService.sendEmail(
    email,
    'MyQuizPal Assessment Details',
    {
      name: `${first_name} ${last_name}`,
      code: existingAssessment.code,
    },
    './templates/studentAssessment.handlebars'
  );

  return existingAssessment;
}

async function retrieveAssessmentByStudent(studentId, accessCode) {
  const existingStudent = await Student.findOne({ id: studentId });

  if (!existingStudent) {
    throw new ResourceExists('Student details does not exist');
  }

  const existingAssessment = await Assessment.findOne({
    code: accessCode,
  }).populate({
    path: 'questions',
    model: 'Question',
  });

  if (!existingAssessment) {
    throw new ResourceExists(
      'Wrong access code. Please verify the code and try again.'
    );
  }

  const existingTeacher = await Teacher.findOne({
    id: existingAssessment.teacher_id,
  });

  const data = {
    assessmentId: existingAssessment._id,
    subject: existingAssessment.subject,
    teacherName: `${existingTeacher?.first_name} ${existingTeacher?.last_name}`,
    timeForTest: existingAssessment.time_for_test,
    DateCreated: existingAssessment.updatedAt,
    questions: existingAssessment.questions,
  };

  return data;
}

// assessmentId, teacherId, assessment, questions
async function updateAssessment(assessmentId, data) {
  const existingTeacher = await Teacher.findOne({ id: data.teacherId });

  if (!existingTeacher) {
    throw new ResourceExists("Teacher's details does not exist");
  }

  let updatedAssessment;
  if (data.assessment) {
    updatedAssessment = await Assessment.findByIdAndUpdate(
      assessmentId,
      data.assessment,
      { new: true }
    );
  }

  let updatedQuestions;
  if (data.assessment.questions) {
    const updatePromises = data.assessment.questions.map(q => {
      const { _id, question, options, answer, correction } = q;
      return Question.findByIdAndUpdate(
        _id,
        { question, options, answer, correction },
        { new: true }
      );
    });

    updatedQuestions = await Promise.all(updatePromises);
  }

  const dataResults = {
    updatedAssessment: updatedAssessment,
    updatedQuestions: updatedQuestions,
  };

  return dataResults;
}

async function deleteAssessment(assessmentId, teacherId) {
  const existingTeacher = await Teacher.findOne({ id: teacherId });

  if (!existingTeacher) {
    throw new ResourceExists("Teacher's details does not exist");
  }

  const existingAssessment = await Assessment.findById({ _id: assessmentId });

  if (!existingAssessment) {
    throw new ResourceExists('Assessment details does not exist');
  }
  const questions = await Question.deleteMany({
    assessment_id: existingAssessment._id,
  });

  const deleted = await Assessment.findByIdAndDelete({ _id: assessmentId });

  return { questions, deleted };
}

async function updateAccessCode(assessmentId, teacherId) {
  const existingTeacher = await Teacher.findOne({ id: teacherId });

  if (!existingTeacher) {
    throw new ResourceExists("Teacher's details does not exist");
  }

  const existingAssessment = await Assessment.findById({ _id: assessmentId });

  if (!existingAssessment) {
    throw new ResourceExists('Assessment details does not exist');
  }

  const accessCode = await generateAccessCode();

  const updatedAssessment = await Assessment.findByIdAndUpdate(
    { _id: assessmentId },
    { code: accessCode },
    { new: true }
  );

  return updatedAssessment;
}

module.exports = {
  sendAssessment,
  retrieveAssessmentByTeacher,
  retrieveAllAssessments,
  sendAssessmentCode,
  retrieveAssessmentByStudent,
  updateAssessment,
  deleteAssessment,
  updateAccessCode,
};
