const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const assessmentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    time_for_test: {
        type: String,
    }
}, { timestamps: true});

const Assessment = model("Assessment", assessmentSchema);

module.exports = Assessment;