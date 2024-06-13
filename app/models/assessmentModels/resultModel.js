const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const resultModel = new Schema({
    assessment_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    
})