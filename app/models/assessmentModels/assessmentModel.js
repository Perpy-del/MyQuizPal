const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const assessmentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    teacher_id: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    time_for_test: {
      type: String,
    },
  },
  { timestamps: true }
);

// Virtual populate
assessmentSchema.virtual('questions', {
  ref: 'Question', // The model to use
  localField: '_id', // Find questions where `localField`
  foreignField: 'assessment_id', // is equal to `foreignField`
});

// Ensure virtual fields are serialized
assessmentSchema.set('toObject', { virtuals: true });
assessmentSchema.set('toJSON', { virtuals: true });

const Assessment = model('Assessment', assessmentSchema);

module.exports = Assessment;
