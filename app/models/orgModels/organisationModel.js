const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const organisationSchema = new Schema({
  organisation_name: {
    type: String,
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {timestamps: true});

const Organisation = model('Organisation', organisationSchema);

module.exports = Organisation;