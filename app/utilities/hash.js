const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRound = Number(process.env.DEV_BCRYPT_SALT_ROUND);

    return new Promise ((resolve, reject) => {
        bcrypt.hash(password, saltRound, function(error, hash) {
            if (error) {
                console.error(error);
            }
            try {
                resolve(hash);                
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    })
}

async function compareHashPassword(password, passwordHash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, function(error, result) {
            if (error) {
                console.error(error);
            }
            try {
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    })
}

module.exports = {
    hashPassword,
    compareHashPassword
}