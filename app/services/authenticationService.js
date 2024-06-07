const Teacher = require('../models/userModels/teacherModel')
const Student = require('../models/userModels/studentModel')
const Admin = require('../models/userModels/adminModel')
const Organisation = require('../models/orgModels/organisationModel');
const ResourceExists = require('../errors/ResourceExists');
const bcrypt = require('bcrypt');
const randomId = require('../utilities/generateId');
const BadUserRequestError = require('../errors/BadUserRequestError');

async function registerAdmin(adminData) {
    const existingAdmin = await Admin.findOne({ email: adminData.email })

    if (existingAdmin) {
        throw new ResourceExists('A user with the provided email address already exists')
    }

    
    if (adminData.password !== adminData.confirmPassword) {
        throw new BadUserRequestError("The passwords do not match. Please try again")
    }  

    const saltRound = Number(process.env.DEV_BCRYPT_SALT_ROUND);
    let passwordHash = bcrypt.hashSync(adminData.password, saltRound)

    const newAdmin = await Admin.create({
        id: randomId(),
        first_name: adminData.firstName,
        last_name: adminData.lastName,
        email: adminData.email,
        organisation_name: adminData.organisation,
        phone_number: adminData.phoneNumber,
        password: passwordHash,
        confirm_password: passwordHash
    })

    const newOrganisation = await Organisation.create({
        organisation_name: adminData.organisation,
    })

    const data = {
        org_profile: newOrganisation,
        admin_profile: newAdmin
    }

    return data;
}

module.exports = {
    registerAdmin
}