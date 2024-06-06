const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const teacherSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email_address: {
            type: String,
            required: true
        },
        phone_number: Number,
        password: {
            type: String,
            required: true
        },
    }
)

const Teacher = model('Teacher', teacherSchema);

module.exports = Teacher;