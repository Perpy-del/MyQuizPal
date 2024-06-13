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

module.exports = {
  postAssessment,
};
