const service = require('../../services/authenticationService');

async function createNewAdmin(request, response) {
  try {
    const result = await service.registerAdmin(request.body);

    const {
      id,
      first_name,
      last_name,
      email,
      role,
      phone_number,
      organisation_name,
      created_at,
      updated_at,
    } = result.admin_profile;

    response.json({
      data: {
        adminId: id,
        firstName: first_name,
        lastName: last_name,
        email: email,
        role: role,
        organisation: organisation_name,
        organisationId: result.org_profile._id,
        phoneNumber: phone_number,
        createdAt: created_at,
        updatedAt: updated_at,
      },
    });
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

    const {
      id,
      first_name,
      last_name,
      email,
      role,
      phone_number,
      organisation_name,
      admin_in_charge,
      created_at,
      updated_at,
    } = result;

    response.json({
      data: {
        teacherId: id,
        firstName: first_name,
        lastName: last_name,
        email: email,
        role: role,
        organisationName: organisation_name,
        adminInCharge: admin_in_charge,
        phoneNumber: phone_number,
        createdAt: created_at,
        updatedAt: updated_at,
      },
    });
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

    const {
      id,
      first_name,
      last_name,
      email,
      role,
      phone_number,
      created_at,
      updated_at,
    } = result;

    response.json({
      data: {
        teacherId: id,
        firstName: first_name,
        lastName: last_name,
        email: email,
        role: role,
        phoneNumber: phone_number,
        createdAt: created_at,
        updatedAt: updated_at,
      },
    });
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

    const {
      id,
      first_name,
      last_name,
      email,
      role,
      phone_number,
      created_at,
      updated_at,
    } = result;

    response.json({
      data: {
        studentId: id,
        firstName: first_name,
        lastName: last_name,
        email: email,
        role: role,
        phoneNumber: phone_number,
        createdAt: created_at,
        updatedAt: updated_at,
      },
    });
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
      data: result
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
  userLoginRequest
};
