import User from '../models/User.js';
import Product from '../models/Product.js';
import Complaint from '../models/Complaint.js';
import Review from '../models/Review.js';

export const addProduct = async (req, res) => {
    try {
        const { productName, price, amoоunt, description, color, images } = req.body;

        const addNewProduct = new Product({
            productName,
            price,
            amoоunt,
            description,
            color,
            images
        })

        addNewProduct.save();

        res.status(201).json(addNewProduct);

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products.length) {
            return res.status(200).json({
                message: "Нет товаров"
            });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const findProduct = await Product.findById(req.body.productId);

        if (!findProduct) {
            return res.status(405).json({
                message: "Не возможно получить товар"
            });
        }
        const reviews = await Promise.all(
            findProduct.reviews.map((userId) => Review.findById(userId))
        );

        const product = {
            products: findProduct,
            reviews
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const actionsShoppingCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const findProduct = user.shoppingCart.includes(req.body.productId);

        if (!findProduct) {
            const updatedUser = await User.findByIdAndUpdate(req.userId, {
                $push: { shoppingCart: findProduct._id }
            }, { new: true });

            return res.status(200).json(updatedUser);

        } else {
            const updatedUser = await User.findByIdAndUpdate(req.userId, {
                $pull: { shoppingCart: findProduct._id }
            }, { new: true });

            return res.status(200).json(updatedUser);

        }

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const getProductsShoppingCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(403).json({
                message: 'Авторизуйтесь для добавления товара в корзину'
            });
        }

        const products = await Promise.all(
            user.shoppingCart.map((productId) => Product.findById(productId))
        );

        if (!products) {
            return res.status(200).json({
                message: 'В корзине пока ничего нет :)'
            });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const sendReview = async (req, res) => {
    try {
        const { username, review } = req.body;

        const newRreview = new Review({
            username,
            review
        });

        await newRreview.save();

        res.status(201).json(newRreview);
    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const sendComplaint = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const product = await Product.findById(req.body.productId)

        const newComplaint = new Complaint({
            user,
            product,
            complaint: req.body.complaint
        });

        await newComplaint.save();

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};