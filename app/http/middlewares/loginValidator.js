const Joi = require('joi');

function loginValidator(request, response, next) { 
    const schema = Joi.object({
        email: Joi.string().trim().required().email(),
        password: Joi.string().trim().required(),
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

module.exports = loginValidator;