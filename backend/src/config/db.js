const mongoose = require('mongoose');

async function main() {
    try {
        console.log("Connecting to MongoDB with URI:", process.env.DB_CONNECT_STRING.substring(0, 50) + "...");
        await mongoose.connect(process.env.DB_CONNECT_STRING)
        console.log("MongoDB connected successfully!");
    } catch(err) {
        console.log("MongoDB Connection Error:", err.message);
        throw err;
    }
}

module.exports = main;


