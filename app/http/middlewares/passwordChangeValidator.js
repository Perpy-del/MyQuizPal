const Joi = require('joi');

function passwordChangeValidator(request, response, next) { 
    const schema = Joi.object({
        id: Joi.string().trim().required(),
        secretKey: Joi.string().trim().required(),
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

module.exports = passwordChangeValidator;