import User from '../models/User.js';
import Product from '../models/Product.js';
import Complaint from '../models/Complaint.js';
import Review from '../models/Review.js';
import { Request, Response } from "express";

export class productController {
    static async getProducts(req: Request, res: Response) {
        const productId = req.body.id;
        if (productId) {
            const product = await getProductsService.get(productId);
            res.status(200).json({ product });
        }
        const products = await getProductsService.get(null);
        res.status(200).json({ products });
    };

    static async shoppingCart(req: Request, res: Response) {
        const { userId, productId } = req.body;
        if (productId) {
            const updatedUser = await shoppingCartService.actions(userId, productId);
            return res.status(200).json({ updatedUser });
        }
        const products = await shoppingCartService.get(userId);
        return res.status(200).json({ products });
    };

    static async sendReview(req: Request, res: Response) {
        const { username, review } = req.body;
        const newRreview = await reviewService.send(username, review);
        return res.status(200).json({ newRreview });
    };

    static async sendComplaint(req: Request, res: Response) {
        const { productId, complaint } = req.body;
        const userId = req.body.userId;
        const newComplaint = await complaintService.send(userId, productId, complaint);
        return res.status(200).json({ newComplaint });
    };
};

class getProductsService {
    static async get(productId: any) {
        if (productId) {
            const findProduct = await Product.findById(productId);

            if (!findProduct) {
                return { message: "Не возможно получить товар" };
            }

            const reviews = await Promise.all(
                findProduct.reviews.map((userId) => Review.findById(userId))
            );

            const product = { products: findProduct, reviews };

            return product;
        }
        const products = await Product.find();

        if (!products.length) {
            return { message: "Нет товаров" };
        }

        return products;
    };
};

class shoppingCartService {
    static async get(userId: any) {
        const user = await User.findById(userId);

        if (!user) {
            return { message: 'Авторизуйтесь для добавления товара в корзину' };
        }

        const products = await Promise.all(
            user.shoppingCart.map((productId) => Product.findById(productId))
        );

        if (!products) {
            return { message: 'В корзине пока ничего нет :)' };
        }
    };

    static async actions(userId: any, productId: any) {
        const user: any = await User.findById(userId);
        const findProduct: any = user.shoppingCart.includes(productId);

        if (!findProduct) {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $push: { shoppingCart: findProduct._id }
            }, { new: true });

            return updatedUser;

        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull: { shoppingCart: findProduct._id }
        }, { new: true });

        return updatedUser;
    };
};

class reviewService {
    static async send(username: string, review: string) {
        const newRreview = new Review({
            username,
            review
        });

        await newRreview.save();

        return newRreview;
    };
};

class complaintService {
    static async send(userId: any, productId: any, complaint: string) {
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        const newComplaint = new Complaint({
            user,
            product,
            complaint,
        });

        await newComplaint.save();

        return newComplaint;
    };
};



// export const addProduct = async (req, res) => {
//     try {
//         const { productName, price, amoоunt, description, color, images } = req.body;

//         const addNewProduct = new Product({
//             productName,
//             price,
//             amoоunt,
//             description,
//             color,
//             images
//         })

//         addNewProduct.save();

//         res.status(201).json(addNewProduct);

//     } catch (error) {
//         res.status(500).json({
//             message: "Ошибка с сервером"
//         });
//     }
// };

// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();

//         if (!products.length) {
//             return res.status(200).json({
//                 message: "Нет товаров"
//             });
//         }

//         res.status(200).json(products);

//     } catch (error) {
//         res.status(500).json({
//             message: "Ошибка с сервером"
//         });
//     }
// };

// export const getProductById = async (req, res) => {
//     try {
//         const findProduct = await Product.findById(req.body.productId);

//         if (!findProduct) {
//             return res.status(404).json({
//                 message: "Не возможно получить товар"
//             });
//         }
//         const reviews = await Promise.all(
//             findProduct.reviews.map((userId) => Review.findById(userId))
//         );

//         const product = {
//             products: findProduct,
//             reviews
//         }

//         res.status(200).json(product);

//     } catch (error) {
//         res.status(500).json({
//             message: "Ошибка с сервером"
//         });
//     }
// };

// export const actionsShoppingCart = async (req, res) => {
//     try {
//         const user = await User.findById(req.userId);
//         const findProduct = user.shoppingCart.includes(req.body.productId);

//         if (!findProduct) {
//             const updatedUser = await User.findByIdAndUpdate(req.userId, {
//                 $push: { shoppingCart: findProduct._id }
//             }, { new: true });

//             return res.status(200).json(updatedUser);

//         } else {
//             const updatedUser = await User.findByIdAndUpdate(req.userId, {
//                 $pull: { shoppingCart: findProduct._id }
//             }, { new: true });

//             return res.status(200).json(updatedUser);

//         }

//     } catch (error) {
//         res.status(500).json({
//             message: "Ошибка с сервером"
//         });
//     }
// };

// export const getProductsShoppingCart = async (req, res) => {
//     try {
//         const user = await User.findById(req.userId);

//         if (!user) {
//             return res.status(403).json({
//                 message: 'Авторизуйтесь для добавления товара в корзину'
//             });
//         }

//         const products = await Promise.all(
//             user.shoppingCart.map((productId) => Product.findById(productId))
//         );

//         if (!products) {
//             return res.status(200).json({
//                 message: 'В корзине пока ничего нет :)'
//             });
//         }

//         res.status(200).json(products);

//     } catch (error) {
//         res.status(500).json({
//             message: "Ошибка с сервером"
//         });
//     }
// };

// export const sendReview = async (req, res) => {
//     try {
//         const { username, review } = req.body;

//         const newRreview = new Review({
//             username,
//             review
//         });

//         await newRreview.save();

//         res.status(201).json(newRreview);
//     } catch (error) {
//         res.status(500).json({
//             message: "Ошибка с сервером"
//         });
//     }
// };

// export const sendComplaint = async (req, res) => {
//     try {
//         const user = await User.findById(req.userId);
//         const product = await Product.findById(req.body.productId)

//         const newComplaint = new Complaint({
//             user,
//             product,
//             complaint: req.body.complaint
//         });

//         await newComplaint.save();

//     } catch (error) {
//         res.status(500).json({
//             message: "Ошибка с сервером"
//         });
//     }
// };