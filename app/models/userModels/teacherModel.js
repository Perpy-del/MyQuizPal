const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const teacherSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
    },
    phone_number: String,
    organisation_name: String,
    admin_in_charge: String,
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = model('Teacher', teacherSchema);

module.exports = Teacher;
