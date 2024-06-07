const service = require('../../services/authenticationService');

async function createNewAdmin(request, response) {
  try {
    const result = await service.registerAdmin(request.body);

    const {
      id,
      first_name,
      last_name,
      email,
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
        organisation: organisation_name,
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

module.exports = {
    createNewAdmin,
    addNewTeacher
}
