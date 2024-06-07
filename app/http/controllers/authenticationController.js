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
        admin_id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        organisation: organisation_name,
        organisation_id: result.org_profile._id,
        phone_number: phone_number,
        created_at: created_at,
        updated_at: updated_at,
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
    createNewAdmin
}
