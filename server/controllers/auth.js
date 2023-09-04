import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            { id: newUser._id },
            'secretKey',
            { expiresIn: '1d' }
        );

        await newUser.save();

        res.status(201).json({ newUser, token });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByOne({ email });

        const token = jwt.sign(
            { id: user._id },
            'secretKey',
            { expiresIn: '1d' }
        );
        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};