const { randomInt } = require('node:crypto');
const { add, isAfter } = require('date-fns');

function generateRandomToken() {
    const passwordToken = randomInt(10000, 99999);

    const now = new Date();
    const expiryTime = add(now, { minutes: 5 });

    return {passwordToken, expiryTime};
}

function checkIfTokenHasExpired(expiryTime) {
    const now = new Date();

    return isAfter(now, expiryTime)
}

module.exports = {
    generateRandomToken, 
    checkIfTokenHasExpired
}