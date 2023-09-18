import { Router } from "express";
import { registerValidation, loginValidation } from "../middlewares/authValidations";
import { checkAuth } from '../middlewares/checkAuth';
import { authController } from "../controllers/auth";

const router = Router();

router.post('/register', registerValidation, authController.registerUser);
router.post('/login', loginValidation, authController.loginUser);
router.get('/get-me', checkAuth, authController.getMe);

export default router;