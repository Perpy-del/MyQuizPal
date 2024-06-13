const Joi = require('joi');

function postAssessmentValidator(request, response, next) {
  const schema = Joi.object({
    subject: Joi.string().trim().required(),
    teacher_id: Joi.string().required(),
    time_for_test: Joi.string().trim().required(),
    questions: Joi.any(),
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

module.exports = postAssessmentValidator;
