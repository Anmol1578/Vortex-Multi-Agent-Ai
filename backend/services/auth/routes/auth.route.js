import express from 'express';
import { login, logout , updateUserPayment , getUserById} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.get('/user/:userId', getUserById);
router.post('/update-plan', updateUserPayment)

export default router;
