const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const adminSchema = new Schema(
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
    organisation_name: {
      type: String,
      required: true,
    },
    role: {
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
  { timeStamp: true }
);

const Admin = model('Admin', adminSchema);

module.exports = Admin;
