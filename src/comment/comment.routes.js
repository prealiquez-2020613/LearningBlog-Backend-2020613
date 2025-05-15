import {Router} from 'express';
import {addCommentary, updateCommentary, deleteCommentary, getCommentsByPost} from './comment.controller.js';
import {addCommentaryValidator, updateCommentaryValidator} from '../../helpers/validators.js';

const api = Router();

api.post('/addCommentary', [addCommentaryValidator], addCommentary);
api.put('/updateCommentary/:id', [updateCommentaryValidator], updateCommentary);
api.delete('/deleteCommentary/:id', deleteCommentary);
api.get('/getCommentsByPost', getCommentsByPost)

export default api;