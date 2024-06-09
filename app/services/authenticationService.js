const Teacher = require('../models/userModels/teacherModel');
const Student = require('../models/userModels/studentModel');
const Admin = require('../models/userModels/adminModel');
const Organisation = require('../models/orgModels/organisationModel');
const ResourceExists = require('../errors/ResourceExists');
const bcrypt = require('bcrypt');
const randomId = require('../utilities/generateId');
const BadUserRequestError = require('../errors/BadUserRequestError');
const AuthenticationError = require('../errors/AuthenticationError');
const hash = require('../utilities/hash');

async function registerAdmin(adminData) {
  const existingAdmin = await Admin.findOne({ email: studentData.email });
  const existingTeacher = await Teacher.findOne({ email: studentData.email });
  const existingStudent = await Student.findOne({ email: studentData.email });

  const existingUser = existingAdmin || existingTeacher || existingStudent;

  if (existingUser) {
    throw new ResourceExists('User with the provided credentials already exists')
  }

  if (adminData.password !== adminData.confirmPassword) {
    throw new BadUserRequestError(
      'The passwords do not match. Please try again'
    );
  }

  const passwordHash = hash.hashPassword(adminData.password);

  const newAdmin = await Admin.create({
    id: randomId(),
    first_name: adminData.firstName,
    last_name: adminData.lastName,
    email: adminData.email,
    organisation_name: adminData.organisation,
    phone_number: adminData.phoneNumber,
    password: passwordHash,
  });

  const newOrganisation = await Organisation.create({
    organisation_name: adminData.organisation,
    admin_id: newAdmin.id,
  });

  const data = {
    org_profile: newOrganisation,
    admin_profile: newAdmin,
  };

  return data;
}

async function addTeacher(teacherData) {
  const existingAdmin = await Admin.findOne({ email: teacherData.adminEmail });

  if (!existingAdmin) {
    throw new AuthenticationError(
      'Admin is not found and is not authorized to perform this operation'
    );
  }

  const { organisation_name, first_name, last_name } = existingAdmin;

  const existingEmail = teacherData.email || adminEmail;

  const existingTeacher = await Teacher.findOne({ email: existingEmail });

  if (existingTeacher) {
    throw new ResourceExists(
      'User with the provided credentials already exists'
    );
  }

  if (teacherData.password !== teacherData.confirmPassword) {
    throw new BadUserRequestError(
      'The passwords do not match. Please try again'
    );
  }

  const passwordHash = hash.hashPassword(teacherData.password);

  const newTeacher = await Teacher.create({
    id: randomId(),
    first_name: teacherData.firstName,
    last_name: teacherData.lastName,
    admin_in_charge: `${first_name} ${last_name}`,
    email: teacherData.email,
    organisation_name: organisation_name,
    phone_number: teacherData.phoneNumber,
    password: passwordHash,
  });

  return newTeacher;
}

async function registerTeacher(teacherData) {
  const existingAdmin = await Admin.findOne({ email: studentData.email });
  const existingTeacher = await Teacher.findOne({ email: studentData.email });
  const existingStudent = await Student.findOne({ email: studentData.email });

  const existingUser = existingAdmin || existingTeacher || existingStudent;

  if (existingUser) {
    throw new ResourceExists('User with the provided credentials already exists')
  }

  if (teacherData.password !== teacherData.confirmPassword) {
    throw new BadUserRequestError(
      'The passwords do not match. Please try again'
    );
  }

  const passwordHash = hash.hashPassword(teacherData.password);

  const newTeacher = await Teacher.create({
    id: randomId(),
    first_name: teacherData.firstName,
    last_name: teacherData.lastName,
    email: teacherData.email,
    phone_number: teacherData.phoneNumber,
    password: passwordHash,
  });

  return newTeacher;
}

async function registerStudent(studentData) {
  const existingAdmin = await Admin.findOne({ email: studentData.email });
  const existingTeacher = await Teacher.findOne({ email: studentData.email });
  const existingStudent = await Student.findOne({ email: studentData.email });

  const existingUser = existingAdmin || existingTeacher || existingStudent;

  if (existingUser) {
    throw new ResourceExists('User with the provided credentials already exists')
  }

  if (studentData.password !== studentData.confirmPassword) {
    throw new BadUserRequestError(
      'The passwords do not match. Please try again'
    );
  }

  const passwordHash = hash.hashPassword(studentData.password);

  const newStudent = await Student.create({
    id: randomId(),
    first_name: studentData.firstName,
    last_name: studentData.lastName,
    email: studentData.email,
    phone_number: studentData.phoneNumber,
    password: passwordHash,
  });

  return newStudent;
}

async function loginTeacher(teacherData) {
  const existingTeacher = await Teacher.findOne({ email: teacherData.email });

  if (!existingTeacher) {
    throw new ResourceExists('User credentials do not match our records.')
  }

  const passwordConfirm = hash.compareHashPassword(teacherData.password, existingTeacher.password)

  console.log(passwordConfirm)
}

module.exports = {
  registerAdmin,
  registerTeacher,
  registerStudent,
  addTeacher,
};
