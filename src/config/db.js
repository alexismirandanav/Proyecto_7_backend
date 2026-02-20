const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('conectado a la base de datos');
    } catch (error) {
        console.error('error al conectar con MongoDB', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;