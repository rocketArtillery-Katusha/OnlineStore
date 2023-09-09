import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth.js";
import { registerValidation, loginValidation } from "../middlewares/authValidations.js";
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/get-me', checkAuth, getMe);

export default router;