import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletePost, getPosts, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

// const app = express();

// app.route('/').post(verifyToken, create).get(verifyToken, getPosts).delete('/:postID/:userId',verifyToken, deletePost).put('/:postID/:userId',verifyToken, updatePost);

// router.post('/', verifyToken, create).get(verifyToken, getPosts).delete('/:postID/:userId',verifyToken, deletePost).put('/:postID/:userId',verifyToken, updatePost);
// router.route('/').post(verifyToken, create).get(verifyToken, getPosts).delete('/:postID/:userId',verifyToken, deletePost).put('/:postID/:userId',verifyToken, updatePost);

router.post('/create', verifyToken, create);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
router.put('/updatepost/:postId/:userId',verifyToken, updatePost)

export default router;