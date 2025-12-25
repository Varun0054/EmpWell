import mongoose from 'mongoose';

const uri = "mongodb+srv://rockSun:V%40run0054@cluster0.jdgjpq6.mongodb.net/?appName=Cluster0";

console.log('--- Database Connection Diagnostic Script ---');
console.log('Target URI:', uri.replace(/:([^@]+)@/, ':****@')); // Hide password in log

async function testConnection() {
    try {
        console.log('Attempting to connect...');
        const start = Date.now();

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000 // Fail fast (5s) instead of 30s
        });

        const duration = Date.now() - start;
        console.log(`✅ SUCCESS: Connected to MongoDB in ${duration}ms`);
        console.log(`Host: ${mongoose.connection.host}`);
        console.log(`Database Name: ${mongoose.connection.name}`);

        await mongoose.disconnect();
        console.log('Disconnected.');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ CONNECTION FAILED');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);

        if (error.message.includes('bad auth')) {
            console.log('\n⚠️  DIAGNOSIS: INVALID CREDENTIALS. Please check your username and password.');
        } else if (error.message.includes('querySrv ETIMEOUT')) {
            console.log('\n⚠️  DIAGNOSIS: BACKEND CANNOT REACH CLUSTER (DNS/Network). Check your internet connection.');
        } else if (error.message.includes('buffering timed out') || error.reason?.type === 'ReplicaSetNoPrimary') {
            console.log('\n⚠️  DIAGNOSIS: IP WHITELIST ISSUE. Your IP Address is likely not allowed in MongoDB Atlas.');
        } else {
            console.log('\n⚠️  DIAGNOSIS: Unknown issue. Check the error code above.');
        }
        process.exit(1);
    }
}

testConnection();
