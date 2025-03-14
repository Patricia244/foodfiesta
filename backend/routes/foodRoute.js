import express from 'express';
import { addFoodItem,getFoodItems,deleteFoodItem} from '../controllers/foodController.js';
import multer from 'multer';

const router = express.Router();
//image storage engine

const storage = multer.diskStorage({
    destination:"uploads/",
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];

        cb(null, `${file.originalname}_${Date.now()}.${ext}`);
    },
}); 
;
 const upload = multer({ storage: storage });

router.post('/addItem',upload.single("image"), addFoodItem);
router.get('/listItems', getFoodItems);
router.post('/deleteItem', deleteFoodItem);

export default router;