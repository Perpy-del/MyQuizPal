const { randomInt } = require('node:crypto');
const { add, isAfter } = require('date-fns');

function generateRandomToken() {
  return new Promise((resolve, reject) => {
    randomInt(1000, 9999, (error, passwordToken) => {
      if (error) {
        console.error(error);
      }
      const now = new Date();
      const expiryTime = add(now, { minutes: 5 });
      try {
        resolve({ passwordToken, expiryTime });
      } catch (error) {
        reject(error);
      }
    });
  });
}

function checkIfTokenHasExpired(expiryTime) {
  const now = new Date();

  return isAfter(now, expiryTime);
}

module.exports = {
  generateRandomToken,
  checkIfTokenHasExpired,
};
