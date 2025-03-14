import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
         await mongoose.connect('mongodb+srv://ecommerce:toDPMXUuJbcJ1x66@cluster0.wgex7.mongodb.net/food-del').
         then(() => {
            console.log('Connected to the Database successfully');  
         })
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};