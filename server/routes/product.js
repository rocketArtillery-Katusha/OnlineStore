import { Router } from "express";
import { getAllProducts, getProductById, actionsShoppingCart, getProductsShoppingCart, sendReview, sendComplaint, } from "../controllers/product.js";
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.get('/get-products', getAllProducts);
router.get('/get-product:id', getProductById);
router.get('/get-products-shop-cart', checkAuth, getProductsShoppingCart);
router.patch('/actions-shop-cart', checkAuth, actionsShoppingCart);
router.post('/send-review', checkAuth, sendReview);
router.post('/send-complaint', checkAuth, sendComplaint);

export default router;