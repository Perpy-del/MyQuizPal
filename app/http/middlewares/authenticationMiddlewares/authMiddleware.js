const jwt = require('jsonwebtoken');

async function authenticateUser(request, response, next) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return response.status(401).json({
      data: {
        error: {
          title: 'Authentication Error',
          message: 'Please authenticate to continue.',
        },
      },
    });
  }

  const [bearer, token] = authorizationHeader.split(' ');

  try {
    jwt.verify(token, process.env.STAGING_APP_SECRET);
  } catch (error) {
    return response.status(401).json({
      data: {
        error: {
          title: 'Authentication Error',
          message: 'Please authenticate to continue.',
        },
      },
    });
  }

  next();
}

module.exports = authenticateUser;
