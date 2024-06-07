const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const organisationSchema = new Schema({
  organisation_name: {
    type: String,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
  }
}, {timestamps: true});

const Organisation = model('Organisation', organisationSchema);

module.exports = Organisation;