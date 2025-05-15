import {body} from 'express-validator';
import {validateErrorWithoutImg} from './validate.error.js'

export const addPostValidator = [
    body('title', 'Title is required').notEmpty().isLength({max : 500}),
    body('category', 'Category is required').notEmpty(),
    body('content', 'Content is required').notEmpty(),
    body('author', 'Author is required').notEmpty().isLength({max : 100}),
    validateErrorWithoutImg
];

export const updatePostValidator = [
    body('title', 'Title is required').optional().notEmpty().isLength({max : 500}),
    body('category', 'Category is required').optional().notEmpty(),
    body('content', 'Content is required').optional().notEmpty(),
    body('author', 'Author is required').optional().notEmpty().isLength({max : 100}),
    validateErrorWithoutImg
];

export const addCommentaryValidator = [
    body('author', 'Author is required').notEmpty().isLength({max : 100}),
    body('content', 'Content is required').notEmpty().isLength({max : 1000}),
    body('post', 'Post is required').notEmpty().isMongoId().withMessage('Post must be a valid ID'),
    validateErrorWithoutImg
];

export const updateCommentaryValidator = [
    body('author', 'Author is required').optional().notEmpty().isLength({max : 100}),
    body('content', 'Content is required').optional().notEmpty().isLength({max : 1000}),
    validateErrorWithoutImg
];