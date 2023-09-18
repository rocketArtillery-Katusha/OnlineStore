import { Router } from "express";
import { productController } from "../controllers/product";
import { checkAuth } from '../middlewares/checkAuth';

const router = Router();

router.get('/get-product' || '/get-product:id', productController.getProducts);
router.get('/get-products-shop-cart', checkAuth, productController.shoppingCart);
router.patch('/actions-shop-cart', checkAuth, productController.shoppingCart);
router.post('/send-review', checkAuth, productController.sendReview);
router.post('/send-complaint', checkAuth, productController.sendComplaint);

export default router;