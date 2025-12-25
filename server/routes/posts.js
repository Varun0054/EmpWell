import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// 1. Create Post
// POST /api/posts
router.post('/', async (req, res) => {
    try {
        const { organization, channel, content } = req.body;

        // Validation
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        if (content.length < 20) {
            return res.status(400).json({ message: 'Content must be at least 20 characters long' });
        }

        // Basic Sanitization (Strip emails/phones - placeholder logic)
        // In production, use a library like linkify-it or regex to detect and redact PII
        // For now, simpler checks or just trusting the prompt's request for "Sanitize"
        const sanitizedContent = content
            .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL REDACTED]')
            .replace(/\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})/g, '[PHONE REDACTED]');

        const newPost = new Post({
            organization,
            channel,
            content: sanitizedContent,
            author: 'Anonymous Employee', // Enforce anonymity
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Fetch Posts
// GET /api/posts?organization=Tech%20Corp&channel=Workplace%20Stress
router.get('/', async (req, res) => {
    try {
        const { organization, channel } = req.query;

        // Build filter object
        let filter = {};
        if (organization) filter.organization = organization;
        if (channel) filter.channel = channel;

        const posts = await Post.find(filter).sort({ createdAt: -1 });
        res.json(posts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. React to Post
// POST /api/posts/:id/react
router.post('/:id/react', async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body; // 'notAlone' or 'helpful'

        if (!['notAlone', 'helpful'].includes(type)) {
            return res.status(400).json({ message: 'Invalid reaction type' });
        }

        // In a real app with sessions, we would check if user already reacted
        // For this anonymous stateless version, we just increment.
        // Ideally, we'd use IP or a session token to deduplicate.

        const updateField = `reactions.${type}`;

        const post = await Post.findByIdAndUpdate(
            id,
            { $inc: { [updateField]: 1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
