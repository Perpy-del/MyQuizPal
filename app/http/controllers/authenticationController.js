const service = require('../../services/authenticationService');

async function createNewAdmin(request, response) {
  try {
    const result = await service.registerAdmin(request.body);

    response.json({ data: result });
    
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function addNewTeacher(request, response) {
  try {
    const result = await service.addTeacher(request.body);

    response.json({ data: result });

  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function createNewTeacher(request, response) {
  try {
    const result = await service.registerTeacher(request.body);

    response.json({ data: result });

  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function createNewStudent(request, response) {
  try {
    const result = await service.registerStudent(request.body);

    response.json({ data: result });

  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function userLoginRequest(request, response) {
  try {
    const result = await service.loginUser(request.body);

    response.json({
      data: result,
    });
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function passwordResetRequest(request, response) {
  try {
    const result = await service.resetPassword(request.body.email);

    response.json({
      data: result,
    })
  } catch (error) {
    console.log('Error querying database: ', error);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

module.exports = {
  createNewAdmin,
  addNewTeacher,
  createNewTeacher,
  createNewStudent,
  userLoginRequest,
  passwordResetRequest,
};
