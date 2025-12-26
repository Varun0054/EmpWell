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



export default mongoose.model('Post', postSchema);
