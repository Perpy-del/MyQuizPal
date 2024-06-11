const Teacher = require('../models/userModels/teacherModel');
const Student = require('../models/userModels/studentModel');
const Admin = require('../models/userModels/adminModel');
const Organisation = require('../models/orgModels/organisationModel');
const ResourceExists = require('../errors/ResourceExists');
const randomId = require('../utilities/generateId');
const BadUserRequestError = require('../errors/BadUserRequestError');
const AuthenticationError = require('../errors/AuthenticationError');
const NotFoundError = require('../errors/NotFoundError');
const hash = require('../utilities/hash');
const jwt = require('jsonwebtoken');
const { addSeconds, getTime, formatISO } = require('date-fns');
const { generateRandomToken } = require('../utilities/generateRandomToken');
const Token = require('../models/tokenModel');
const mailService = require('../utilities/sendMail');

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

  const { id, first_name, last_name, email, role, phone_number, organisation_name, created_at, updated_at } = newAdmin;

  const organisation_id = newOrganisation._id;

  const data = {
    adminId: id,
    firstName: first_name,
    lastName: last_name,
    email: email,
    role: role,
    organisation: organisation_name,
    organisationId: organisation_id,
    phoneNumber: phone_number,
    createdAt: created_at,
    updatedAt: updated_at,
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

  const { id, email, role, phone_number, admin_in_charge, created_at, updated_at } = newTeacher;

  const data = {
    teacherId: id,
    firstName: newTeacher.first_name,
    lastName: newTeacher.last_name,
    email: email,
    role: role,
    organisationName: newTeacher.organisation_name,
    adminInCharge: admin_in_charge,
    phoneNumber: phone_number,
    createdAt: created_at,
    updatedAt: updated_at,
  }

  return data;
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

  const { id, first_name, last_name, email, role, phone_number, created_at, updated_at } = newTeacher;

  const data = {
    teacherId: id,
    firstName: first_name,
    lastName: last_name,
    email: email,
    role: role,
    phoneNumber: phone_number,
    createdAt: created_at,
    updatedAt: updated_at,
  }

  return data;
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

  const { id, first_name, last_name, email, role, phone_number, created_at, updated_at } = newStudent;

  const data = {
    studentId: id,
    firstName: first_name,
    lastName: last_name,
    email: email,
    role: role,
    phoneNumber: phone_number,
    createdAt: created_at,
    updatedAt: updated_at,
  }

  return data;
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

  const expiryDate = addSeconds(new Date(), process.env.JWT_EXPIRATION);

  const payload = {
    exp: Math.floor(getTime(expiryDate) / 1000),
    email: existingUser.email,
    id: existingUser.id,
  };

  const token = jwt.sign(payload, process.env.STAGING_APP_SECRET, {
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
    tokenExpiresAt: formatISO(expiryDate)
  };

  return data;
}

async function resetPassword(email) {
  const existingAdmin = await Admin.findOne({email: email});
  const existingTeacher = await Teacher.findOne({email: email});
  const existingStudent = await Student.findOne({email: email});

  const existingUser = existingAdmin || existingTeacher || existingStudent;

  if (!existingUser) {
    throw new NotFoundError('User with the provided credentials does not exist')
  }

  const existingToken = Token.findOne({ user_id: existingUser.id });

  if (!existingToken.token_expired || !existingToken.is_used) {
    existingToken.token_expired = true;
    existingToken.is_used = true;
  }

  const tokenResult = generateRandomToken()

  const token = await Token.create({
    user_id: existingUser.id,
    password_token: tokenResult.passwordToken,
    expiry_time: tokenResult.expiryTime
  })

  await mailService.sendEmail(email, "MyQuizPal Password Request", {
    name: `${existingUser.first_name} ${existingUser.last_name}`,
    token: tokenResult.passwordToken
  }, "./templates/passwordReset.handlebars")

  const { user_id, password_token, expiry_time, is_used, token_expired } = token;

  const data = {
    userId: user_id,
    passwordToken: password_token,
    expiryTime: expiry_time,
    isUsed: is_used,
    tokenExpired: token_expired
  }

  return data;
}

async function sendPasswordToken() {
  
}

module.exports = {
  registerAdmin,
  registerTeacher,
  registerStudent,
  addTeacher,
  loginUser,
  resetPassword
};
