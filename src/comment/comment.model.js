import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        author: {
            type: String,
            required: [true, 'Author name is required'],
            maxLength: [100, 'Author name cannot exceed 100 characters'],
        },
        content: {
            type: String,
            required: [true, 'Comment content is required'],
            maxLength: [1000, 'Comment cannot exceed 1000 characters'],
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'Post reference is required']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

export default model('Comment', commentSchema);
