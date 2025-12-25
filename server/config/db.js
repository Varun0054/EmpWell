import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Hardcoded for now as requested, but ideally should be in .env
        const conn = await mongoose.connect('mongodb+srv://rockSun:V%40run0054@cluster0.jdgjpq6.mongodb.net/?appName=Cluster0');

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Setup for Real-time listeners (Change Streams)
        // const connection = mongoose.connection;
        // connection.once('open', () => {
        //   console.log("MongoDB database connection established successfully");
        //   // TODO: Add Change Stream listeners here later
        //   // const postChangeStream = connection.collection('posts').watch();
        //   // postChangeStream.on('change', (change) => {
        //   //    console.log("Real-time update:", change);
        //   //    // Emit to socket.io here
        //   // });
        // });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        // process.exit(1); // Keep server alive for debugging
    }
};

export default connectDB;
