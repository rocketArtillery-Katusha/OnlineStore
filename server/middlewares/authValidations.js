import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const registerValidation = [
    body('username').isLength({ min: 3, max: 16 }).withMessage('Длина имени от 2 до 25 символов'),

    function (req, res, next) {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(401).json({
                message: error.errors[0].msg
            });
        }

        next();
    },

    body('email').custom((email) => !/\s/.test(email)).withMessage('Почта введина некорректно')
        .isLength({ min: 8, max: 64 }).withMessage('Длина почты от 8 до 64 символов')
        .isEmail().withMessage('Почта введина некорректно'),

    async function (req, res, next) {
        const error = validationResult(req);
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!error.isEmpty()) {
            return res.status(401).json({
                message: error.errors[0].msg
            });

        } else if (user) {
            return res.status(401).json({
                message: 'Такой пользователь уже существует'
            });
        }

        next();
    },

    body('password1')
        .custom((password1, { req }) => password1 === String(req.body.password2)).withMessage('Пароли должны совпадать')
        .custom((password) => !/\s/.test(password)).withMessage('Пароль должен быть без пробелов')
        .isLength({ min: 6, max: 16 }).withMessage('Длина пороля от 6 до 16 символов'),

    function (req, res, next) {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });
        }

        next();
    }
];

export const loginValidation = [
    body('email')
        .custom((email) => !/\s/.test(email)).withMessage('Проверьте корректность введенных данных')
        .isLength({ min: 8, max: 64 }).withMessage('Проверьте корректность введенных данных')
        .isEmail().withMessage('Проверьте корректность введенных данных'),

    async function (req, res, next) {
        const error = validationResult(req);
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });

        } else if (!user) {
            return res.status(401).json({
                message: 'Такого пользователя не существует'
            });
        }

        next();
    },

    body('password')
        .custom((password) => !/\s/.test(password)).withMessage('Неверный пароль')
        .isLength({ min: 6, max: 16 }).withMessage('Неверный пароль'),

    async function (req, res, next) {
        const error = validationResult(req);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.errors[0].msg
            });

        } else if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Неверный пароль'
            });
        }

        next();
    }
];