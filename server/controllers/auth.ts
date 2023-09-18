import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY, EXPIRES_IN } from "../config";

export class authController {
    static async registerUser(req: Request, res: Response) {
        const { username, email, password1 } = req.body;
        const user = await registerService.createUser(username, email, password1);
        const token = await jwtService.createJWT(user._id)
        res.status(201).json({ user, token });
    };

    static async loginUser(req: Request, res: Response) {
        const user = req.body.user;
        const token = await jwtService.createJWT(user.id);
        res.status(200).json({ user, token });
    };

    static async getMe(req: Request, res: Response) {
        const user = await meService.get(req.body.userId);
        res.status(200).json({ user });
    };
};

class registerService {
    static async createUser(username: string, email: string, password1: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password1, salt);

        const newUser = new User({
            username,
            email,
            password: hash
        });

        await newUser.save();
        return newUser;
    };
};

class jwtService {
    static async createJWT(id: any) {
        const token = jwt.sign(
            { id: id },
            SECRET_KEY,
            { expiresIn: EXPIRES_IN }
        );
        return token;
    };
};

class meService {
    static async get(id: any) {
        const user = await User.findById(id);
        return user;
    };
};