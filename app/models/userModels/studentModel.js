const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const studentSchema = new Schema(
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
      unique: true,
    },
    phone_number: String,
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = model('Student', studentSchema);

module.exports = Student;