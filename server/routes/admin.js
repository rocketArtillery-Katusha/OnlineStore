import { Router } from "express";
import { addNewAdmin, getAllComplaints, getComplaintById, freezeProduct, deleteProduct } from "../controllers/admin.js";

const router = Router();

router.get('/get-complaints', getAllComplaints);
router.get('/get-complaint:id', getComplaintById);
router.patch('/freeze-product:id', freezeProduct);
router.post('/add-new-admin', addNewAdmin);
router.delete('/delete-proudct:id', deleteProduct);

export default router;