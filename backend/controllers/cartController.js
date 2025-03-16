import userModel from '../models/userModel.js'
import authMiddleware from '../middleware/auth.js'

export const addToCart = async (req,res)=>{
try {
    let userData = await userModel.findOne({_id:req.body.userId})
    let cartData = await userData.cartData
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1
    }else{
        cartData[req.body.itemId] += 1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"item added to cart"})
} catch (error) {
    res.json({success:false,message:error.message})
}
}

export const removeFromCart = async (req, res) => {
    try {
      const { userId, itemId } = req.body;
  
      // Find the user
      const userData = await userModel.findOne({ _id: userId });
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData;
  
      // Check if the item exists in the cart
      if (cartData[itemId]) {
        if (cartData[itemId] > 1) {
          // Decrease the quantity if more than 1
          cartData[itemId] -= 1;
        } else {
          // Remove the item if the quantity is 1
          delete cartData[itemId];
        }
  
        // Update the user's cart data
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Item removed from cart" });
      } else {
        res.status(404).json({ success: false, message: "Item not found in cart" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  export const fetchUserCartData = async (req, res) => {
    try {
      const { userId } = req.body;
  
      // Find the user
      const userData = await userModel.findOne({ _id: userId });
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Return the user's cart data
      res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };