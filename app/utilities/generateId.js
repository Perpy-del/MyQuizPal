const ULID = require('ulid');

const createRandomID = () => {
    return ULID.ulid();
}

module.exports = createRandomID;