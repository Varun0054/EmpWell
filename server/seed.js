import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Organization from './models/Organization.js';
import Channel from './models/Channel.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
    await connectDB();

    try {
        // Clear existing data (Optional, maybe dangerous in prod but good for dev)
        // await Organization.deleteMany({});
        // await Channel.deleteMany({});

        // Check if data exists first
        const orgCount = await Organization.countDocuments();
        if (orgCount === 0) {
            const orgs = [
                { name: 'Tech Corp' },
                { name: 'Finance Global' },
                { name: 'Health Plus' }
            ];
            await Organization.insertMany(orgs);
            console.log('Organizations seeded');
        }

        const channelCount = await Channel.countDocuments();
        if (channelCount === 0) {
            const channels = [
                { name: 'stress', description: 'Workplace Stress' },
                { name: 'culture', description: 'Company Culture' },
                { name: 'transition', description: 'Career Transition' },
                { name: 'burnout', description: 'Burnout & Recovery' },
                { name: 'leadership', description: 'Management & Leadership' },
                { name: 'general', description: 'General Discussion' }
            ];
            await Channel.insertMany(channels);
            console.log('Channels seeded');
        }

        console.log('Seeding complete');
        process.exit();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
