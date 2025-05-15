import { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [500, 'Title cannot exceed 500 characters']
        },
        category: {
            type: String, 
            required: [true, 'Category is required'],
            enum: ['TECNOLOGÍA', 'TALLER', 'TICS'], 
            uppercase: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required']
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            maxLength: [100, 'Author name cannot exceed 100 characters'],
        }
    }
);

export default model('Post', postSchema);
