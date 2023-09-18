import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from '../config';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // const token = req.headers.authorization;
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (token) {
            const decoded: any = jwt.verify(token, SECRET_KEY);
            req.body.userId = decoded.id;

            next();

        } else {
            return res.status(401).json({
                message: 'Нет достпуа'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};