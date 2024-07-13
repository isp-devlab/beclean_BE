import Express from 'express';
import {register, login, logout, forgotPassword, resetPassword} from '../controller/userController.js'
import { verifyToken } from '../middleware/verifytoken.js';

const router = Express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', verifyToken, logout);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);

export default router;