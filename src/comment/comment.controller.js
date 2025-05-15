import Comment from './comment.model.js';
import Post from '../post/post.model.js';

// Agregar Comentario
export const addCommentary = async (req, res) => {
    try {
        const { post, author, content } = req.body;

        const foundPost = await Post.findById(post);
        if (!foundPost) {
            return res.status(404).send({ success: false, message: 'Post not found' });
        }

        const comment = new Comment({
            author,
            content,
            post,
        });

        await comment.save();
        return res.send({ success: true, message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error saving comment', error });
    }
};

// Actualizar Comentario
export const updateCommentary = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const updatedComment = await Comment.findById(id);
        if (!updatedComment) {
            return res.status(404).send({ success: false, message: 'Comment not found' });
        }

        if(content.post){
            return res.status(404).send({ success: false, message: 'You can not change the post ID' });
        }

        const data = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        return res.send({ success: true, message: 'Comment updated successfully', data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error updating comment', error });
    }
};

// Eliminar Comentario
export const deleteCommentary = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).send({ success: false, message: 'Comment not found' });
        }

        await Comment.findByIdAndDelete(id);
        return res.send({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error deleting comment', error });
    }
};

// Listar Comentarios por Publicación
export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log(postId)
        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 });
        if (comments.length === 0) {
            return res.status(404).send({ success: false, message: 'No comments found for this post' });
        }
        return res.send({ success: true, message: 'Comments found', comments });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error getting comments', error });
    }
};
