import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import jwt from 'jsonwebtoken'
import { response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const exchangeRate = 0.055; 

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * exchangeRate * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    lineItems.push({
        price_data: {
            currency: "usd",
            product_data: {
              name:"Delivery charges",
            },
            unit_amount: Math.round(100 * exchangeRate * 100), // Convert to cents
          },
          quantity: 1,

    })
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`, 
      cancel_url:  `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
      metadata: {
        orderId: newOrder._id.toString(), 
      },
    });

    res.json({ success: true, sessionUrl: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOrder = async(req,res )=>{
  const {orderId,success} = req.body
  try {
    if(success =="true"){
      await orderModel.findOneAndUpdate({_id:orderId},{payment:true})
      res.status(200).json({ success: true, message: "Paid" });
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.status(500).json({ success: false, message:"Not paid" });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const userOrders = async (req,res)=>{
try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.status(200).json({ success: true, order: orders});
    console.log(orders)
} catch (error) {
  console.log("Error placing order:", error);
  res.status(500).json({ success: false, message: error.message });
}
}