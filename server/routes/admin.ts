import { Router } from "express";
import { adminController } from "../controllers/admin";

const router = Router();

router.get('/get-complaints' || '/get-complaints:id', adminController.getComplaints);
router.patch('/freeze-product:id', adminController.toggleFreezeProduct);
router.post('/add-new-admin', adminController.addNewAdmin);
router.delete('/delete-proudct:id', adminController.deleteProduct);

export default router;