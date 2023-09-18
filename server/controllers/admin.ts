import Admin from "../models/Admin";
import User from "../models/User";
import Product from "../models/Product";
import Complaint from "../models/Complaint";
import { Request, Response } from "express";

export class adminController {
    static async addNewAdmin(req: Request, res: Response) {
        const admin = await addAdminSrvice.add(req.body.userId);
        res.status(200).json({ admin });
    };

    static async getComplaints(req: Request, res: Response) {
        const complaintId = req.body.complaintId;
        if (complaintId) {
            const complaint = await getComplaintsSrvice.get(complaintId);
            return res.status(200).json(complaint);
        }
        const complaints = await getComplaintsSrvice.get(null);
        res.status(200).json(complaints);
    };

    static async toggleFreezeProduct(req: Request, res: Response) {
        const productId = req.body.productId;
        const product = await toggleProductService.toggle(productId);
        res.status(200).json(product);
    };

    static async deleteProduct(req: Request, res: Response) {
        const productId = req.body.productId;
        const productMessage = await deleteProductService.delete(productId);
        res.status(200).json(productMessage);
    }
};

class addAdminSrvice {
    static async add(userId: any) {
        const user = await User.findById(userId);

        if (!user) {
            return { message: 'Данный пользователь не обнаружен' };
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: { status: 'admin' }
        }, { new: true });
        const newAdmin = new Admin(user._id);

        newAdmin.save();
        return { message: 'Добавлен новый админ', updatedUser };

    };
};

class getComplaintsSrvice {
    static async get(complaintId: any) {
        if (complaintId) {
            const complaint = await Complaint.findById(complaintId);
            return complaint ? complaint : { message: 'Такой жалобы не обнаружено' };
        }

        const complaints = await Complaint.find();
        return complaints ? complaints : { message: 'Жалоб не обнаружено' };

    };
};

class toggleProductService {
    static async toggle(productId: any) {
        const product: any = await Product.findById(productId);

        if (product.status === 'sale') {
            const updatedProduct = await Product.findByIdAndUpdate(productId, {
                $set: { status: 'frozen' }
            }, { new: true });

            return updatedProduct;
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            $set: { status: 'sale' }
        }, { new: true });

        return updatedProduct;
    }
};

class deleteProductService {
    static async delete(productId: any) {
        const deleteProduct = await Product.findByIdAndDelete(productId);
        return `${deleteProduct?.productName} успешно удалено`;
    };
};