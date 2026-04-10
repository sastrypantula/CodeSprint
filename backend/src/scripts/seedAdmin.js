const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/user');

async function seedAdmin() {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log('✅ MongoDB connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ emailId: 'sastry@admin.com' });
        if (existingAdmin) {
            console.log('⚠️ Admin user already exists!');
            await mongoose.connection.close();
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('admin@123', 10);

        // Create admin user
        const adminUser = new User({
            firstName: 'Sastry',
            lastName: 'Admin',
            emailId: 'sastry@admin.com',
            age: 25,
            role: 'admin',
            password: hashedPassword,
            problemSolved: []
        });

        await adminUser.save();
        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: sastry@admin.com');
        console.log('🔑 Password: admin@123');

        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

seedAdmin();
