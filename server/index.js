import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('EmpWell Backend is Running');
});

// Post Routes will be imported here
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
import chatRoutes from './routes/chat.js';
app.use('/api/chat', chatRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
