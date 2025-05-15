import Post from './post.model.js';
import Comment from '../comment/comment.model.js';

// Agregar Post
export const addPost = async (req, res) => {
    try {
        const data = req.body;

        if (!['TECNOLOGÍA', 'TALLER', 'TICS'].includes(data.category)) {
            return res.status(400).send({ success: false, message: 'Invalid category' });
        }

        const post = new Post(data);
        await post.save();

        return res.send({ success: true, message: 'Post added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error saving post', error });
    }
};

// Actualizar Post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const newdata = req.body;

        const updatedPost = await Post.findById(id);
        if (!updatedPost) {
            return res.status(404).send({ success: false, message: 'Post not found' });
        }

        const data = await Post.findByIdAndUpdate(id, newdata, { new: true });
        return res.send({ success: true, message: 'Post updated successfully', data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error updating post', error });
    }
};

// Eliminar Post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ success: false, message: 'Post not found' });
        }

        await Comment.deleteMany({ post: id });

        await Post.findByIdAndDelete(id);
        return res.send({ success: true, message: 'Post and associated comments deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error deleting post', error });
    }
};

// Listar Posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts.length === 0) {
            return res.status(404).send({ success: false, message: 'No posts found' });
        }
        return res.send({ success: true, message: 'Posts found', posts });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error getting posts', error });
    }
};

// Filtrar Posts por categoría
export const getPostsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        if (!['TECNOLOGÍA', 'TALLER', 'TICS'].includes(category)) {
            return res.status(400).send({ success: false, message: 'Invalid category' });
        }

        const posts = await Post.find({ category }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).send({ success: false, message: 'No posts found for this category' });
        }
        return res.send({ success: true, message: `Posts found for category: ${category}`, posts });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error getting posts by category', error });
    }
};