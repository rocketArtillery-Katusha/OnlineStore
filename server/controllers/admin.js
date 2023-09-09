import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Complaint from "../models/Complaint.js";

export const addNewAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(200).json({
                message: 'Данный пользователь не обнгаружен'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            $set: { status: 'admin' }
        }, { new: true });
        const newAdmin = new Admin(user._id);

        newAdmin.save();

        res.status(200).json({
            message: 'Добавлен новый админ',
            updatedUser
        });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
};

export const getAllComplaints = async (req, res) => {
    const admin = await Admin.findById(req.adminId);
    try {
        const complaints = await Promise.all(
            admin.complaints.map((complaintId) => Complaint.findById(complaintId))
        );

        if (!complaints) {
            return res.status(200).json({
                message: 'Жалоб не обнаружено'
            });
        }

        res.status(200).json(complaints);

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.body.complaintId);

        if (!complaint) {
            return res.status(404).json({
                message: 'Такой жалобы не существует'
            });
        }

        res.status(200).json(complaint);

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const freezeProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId);

        if (!product) {
            return res.status(404).json({
                message: 'Такого товара не существует'
            });
        }
        if (product.status !== 'frozen') {
            const updatedProduct = await Product.findByIdAndUpdate(req.body.productId, {
                $set: { status: 'frozen' }
            }, { new: true });

            return res.status(200).json(updatedProduct);

        } else {
            const updatedProduct = await Product.findByIdAndUpdate(req.body.productId, {
                $set: { status: 'sale' }
            }, { new: true });

            return res.status(200).json(updatedProduct);

        }

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.body.productId, (err) => {
            if (err) {
                return res.json(500).json({
                    message: err
                });
            }
            res.status(200).json({
                message: 'Товар удален'
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Ошибка с сервером"
        });
    }
};