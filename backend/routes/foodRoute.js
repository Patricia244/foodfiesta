import express from 'express';
import { addFoodItem, getFoodItems, deleteFoodItem } from '../controllers/foodController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
});

const upload = multer({ storage: storage });
router.post('/addItem', upload.single('image'), addFoodItem);
router.get('/listItems', getFoodItems);
router.post('/deleteItem', deleteFoodItem);

export default router;
