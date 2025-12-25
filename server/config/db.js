import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        // Hardcoded for now as requested, but ideally should be in .env
        const conn = await mongoose.connect('mongodb+srv://rockSun:V%40run0054@cluster0.jdgjpq6.mongodb.net/?appName=Cluster0');

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // process.exit(1); // Keep server alive for debugging
    }
};

export default connectDB;
