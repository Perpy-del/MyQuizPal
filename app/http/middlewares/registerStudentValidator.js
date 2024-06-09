const Joi = require('joi');

function registerStudentValidator(request, response, next) { 
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50),
        lastName: Joi.string().trim().min(3).max(50),
        email: Joi.string().trim().required().email(),
        phoneNumber: Joi.string(),
        password: Joi.string().trim().required().min(8).max(50),
        confirmPassword: Joi.string().trim().required().min(8).max(50),
    })

    const { error } = schema.validate(request.body, { abortEarly: false });

    if (error) {
        console.log(error);
        const errorDetails = error.details.map((detail) => {
            const message = detail.message.split('"')[2].trim();
            const key = detail.context.key;

            return { [key]: `The ${key} field ${message}` }
        })

        return response.status(422).json({
            'data': {
                'error': {
                    'title': 'Validation Error',
                    'message': errorDetails
                }
            }
        })
    }

    next()
}

module.exports = registerStudentValidator;