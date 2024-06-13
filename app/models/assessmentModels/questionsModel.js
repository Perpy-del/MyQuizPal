const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    assessment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    correction: {
        type: String,
    },
})

const Question = model("Question", questionSchema);

module.exports = Question;