import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || process.env.HOSTED_FRONTEND || process.env.HOSTED_ADMIN,
    credentials: true,
  })
);

app.use(express.json());

const port = 4000;

connectDB();

// API endpoints
app.use("/api/food", foodRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});