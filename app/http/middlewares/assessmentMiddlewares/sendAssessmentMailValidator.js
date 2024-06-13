const Joi = require('joi');

function sendAssessmentMailValidator(request, response, next) {
  const schema = Joi.object({
    teacherId: Joi.string().required(),
    email: Joi.string().trim().required().email(),
  });

  const { error } = schema.validate(request.body, { abortEarly: false });

  if (error) {
    console.log(error);
    const errorDetails = error.details.map(detail => {
      const message = detail.message.split('"')[2].trim();
      const key = detail.context.key;

      return { [key]: `The ${key} field ${message}` };
    });

    return response.status(422).json({
      data: {
        error: {
          title: 'Validation Error',
          message: errorDetails,
        },
      },
    });
  }

  next();
}

module.exports = sendAssessmentMailValidator;
