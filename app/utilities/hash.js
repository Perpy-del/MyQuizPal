const bcrypt = require('bcrypt');

function hashPassword(password) {
    const saltRound = Number(process.env.DEV_BCRYPT_SALT_ROUND);
    let passwordHash = bcrypt.hashSync(password, saltRound)

    return passwordHash;
}

function compareHashPassword(password, passwordHash) {
    let passwordMatch = bcrypt.compareSync(password, passwordHash)

    return passwordMatch;
}

module.exports = {
    hashPassword,
    compareHashPassword
}