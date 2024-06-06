const mongoose = require('mongoose');

async function connectToDb() {
    try {
        const connection = await mongoose.connect(process.env.STAGING_MONGODB_URL)
        console.log('Database connected successfully 👨‍💻')
        return connection;
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDb