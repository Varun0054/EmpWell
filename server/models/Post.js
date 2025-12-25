import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    organization: {
        type: String,
        required: true
        // In a real app, this might be a reference, but prompt asks for String "Tech Corp"
    },
    channel: {
        type: String,
        required: true
        // Similarly, keeping simple string as per prompt requirements
    },
    author: {
        type: String,
        default: "Anonymous Employee"
    },
    content: {
        type: String,
        required: true,
        minlength: 20
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reactions: {
        notAlone: {
            type: Number,
            default: 0
        },
        helpful: {
            type: Number,
            default: 0
        }
    }
});

// Real-time hook placeholder
postSchema.post('save', function (doc) {
    // console.log('This is where we would emit a socket event for a new post');
    // io.to(doc.channel).emit('newPost', doc);
});

// AI Moderation hook placeholder
postSchema.pre('save', function (next) {
    // console.log('This is where AI moderation would check the content');
    // if (aiCheck(this.content).isUnsafe) throw new Error("Content unsafe");

    // Basic sanity check to strip HTML (placeholder for more robust sanitization)
    // this.content = this.content.replace(/<[^>]*>?/gm, '');
    next();
});

export default mongoose.model('Post', postSchema);
