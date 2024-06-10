const Teacher = require('../models/userModels/teacherModel');
const Student = require('../models/userModels/studentModel');
const Admin = require('../models/userModels/adminModel');
const Organisation = require('../models/orgModels/organisationModel');
const ResourceExists = require('../errors/ResourceExists');
const randomId = require('../utilities/generateId');
const BadUserRequestError = require('../errors/BadUserRequestError');
const AuthenticationError = require('../errors/AuthenticationError');
const hash = require('../utilities/hash');
const jwt = require('jsonwebtoken');

async function registerAdmin(adminData) {
  const existingAdmin = await Admin.findOne({ email: adminData.email });
  const existingTeacher = await Teacher.findOne({ email: adminData.email });
  const existingStudent = await Student.findOne({ email: adminData.email });

  const existingUser = existingAdmin || existingTeacher || existingStudent;

  if (existingUser) {
    throw new ResourceExists(
      'User with the provided credentials already exists'
    );
  }

  if (adminData.password !== adminData.confirmPassword) {
    throw new BadUserRequestError(
      'The passwords do not match. Please try again'
    );
  }

  const passwordHash = hash.hashPassword(adminData.password);

  const newAdmin = await Admin.create({
    id: randomId(),
    role: 'admin',
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
    role: 'teacher',
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
  const existingAdmin = await Admin.findOne({ email: teacherData.email });
  const existingTeacher = await Teacher.findOne({ email: teacherData.email });
  const existingStudent = await Student.findOne({ email: teacherData.email });

  const existingUser = existingAdmin || existingTeacher || existingStudent;

  if (existingUser) {
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
    role: 'teacher',
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
    throw new ResourceExists(
      'User with the provided credentials already exists'
    );
  }

  if (studentData.password !== studentData.confirmPassword) {
    throw new BadUserRequestError(
      'The passwords do not match. Please try again'
    );
  }

  const passwordHash = hash.hashPassword(studentData.password);

  const newStudent = await Student.create({
    id: randomId(),
    role: 'student',
    first_name: studentData.firstName,
    last_name: studentData.lastName,
    email: studentData.email,
    phone_number: studentData.phoneNumber,
    password: passwordHash,
  });

  return newStudent;
}

async function loginUser(userData) {
  const existingAdmin = await Admin.findOne({ email: userData.email });
  const existingTeacher = await Teacher.findOne({ email: userData.email });
  const existingStudent = await Student.findOne({ email: userData.email });

  const existingUser = existingAdmin || existingTeacher || existingStudent;

  if (!existingUser) {
    throw new AuthenticationError('User credentials do not match our records.');
  }

  const passwordConfirm = hash.compareHashPassword(
    userData.password,
    existingUser.password
  );

  if (!passwordConfirm) {
    throw new AuthenticationError('User credentials do not match our records.');
  }

  const organisation = await Organisation.findOne({
    organisation_name: existingUser.organisation_name,
  });

  const payload = {
    email: existingUser.email,
    id: existingUser.id,
  };

  const token = jwt.sign(payload, process.env.STAGING_APP_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRATION),
    issuer: process.env.DEV_JWT_ISSUER,
  });

  const data = {
    userId: existingUser.id,
    firstName: existingUser.first_name,
    lastName: existingUser.last_name,
    email: existingUser.email,
    role: existingUser.role,
    phoneNumber: existingUser.phone_number,
    createdAt: existingUser.created_at,
    updatedAt: existingUser.updated_at,
    organisation: existingUser.organisation_name || '',
    organisationId: organisation?._id || '',
    adminInCharge: existingUser.admin_in_charge || '',
    token: token,
  };

  return data;
}

async function loginTeacher(teacherData) {
  const existingTeacher = await Teacher.findOne({ email: teacherData.email });

  if (!existingTeacher) {
    throw new AuthenticationError('User credentials do not match our records.');
  }

  const passwordConfirm = hash.compareHashPassword(
    teacherData.password,
    existingTeacher.password
  );

  if (!passwordConfirm) {
    throw new AuthenticationError('User credentials do not match our records.');
  }

  const payload = {
    email: existingTeacher.email,
    id: existingTeacher.id,
  };

  const token = jwt.sign(payload, process.env.STAGING_APP_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRATION),
    issuer: process.env.DEV_JWT_ISSUER,
  });

  return {
    token,
    existingTeacher,
  };
}

module.exports = {
  registerAdmin,
  registerTeacher,
  registerStudent,
  addTeacher,
  loginUser,
};
