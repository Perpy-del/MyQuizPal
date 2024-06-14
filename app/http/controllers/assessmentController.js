const service = require('../../services/assessmentService');

async function postAssessment(request, response) {
  try {
    const result = await service.sendAssessment(request.body);

    response.json({ data: result });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function getAssessment(request, response) {
  try {
    const results = await service.retrieveAssessmentByTeacher(request.params.assessment_id, request.body.teacherId);

    response.json({ data: results });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function getAllAssessments(request, response) {
  try {
    const results = await service.retrieveAllAssessments(request.body.teacherId);

    response.json({ data: results });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function sendAccessCodeToStudent(request, response) {
  try {
    const results = await service.sendAssessmentCode(request.body.teacherId, request.body.email, request.params.assessment_id);

    response.json({ 
        message: "Access code sent to student successfully",
        data: results 
    });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function getAssessmentByCode(request, response) {
  try {
    const results = await service.retrieveAssessmentByStudent(request.params.student_id, request.body.accessCode);

    response.json({ data: results });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function updateAssessmentDetails(request, response) {
  try {
    const results = await service.updateAssessment(request.params.assessment_id, request.body);

    response.json({ data: results });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function deleteAssessmentDetails(request, response) {
  try {
    await service.deleteAssessment(request.params.assessment_id, request.body.teacherId);

    response.json({ message: "Assessment Deleted Successfully" });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function updateAssessmentCode(request, response) {
  try {
    const results = await service.updateAccessCode(request.params.assessment_id, request.body.teacherId);

    response.json({ data: results });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

module.exports = {
  postAssessment,
  getAssessment,
  getAllAssessments,
  sendAccessCodeToStudent,
  getAssessmentByCode,
  updateAssessmentDetails,
  deleteAssessmentDetails,
  updateAssessmentCode
};
