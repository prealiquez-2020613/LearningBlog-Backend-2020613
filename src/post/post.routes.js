import {Router} from 'express';
import { addPost, updatePost, deletePost, getAllPosts, getPostsByCategory } from '../post/post.controller.js';
import {addPostValidator, updatePostValidator} from '../../helpers/validators.js';

const api = Router();

api.post('/addPost', [addPostValidator], addPost);
api.put('/updatePost/:id', [updatePostValidator], updatePost);
api.delete('/deletePost/:id', deletePost);
api.get('/getAllPosts', getAllPosts)
api.get('/getPostsByCategory,', getPostsByCategory)

export default api;