import foodModel from "../models/foodModel.js"
import fs from "fs";

export const addFoodItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }
    const food = new foodModel({
      name,
      description,
      price,
      image: image.filename, 
      category,
    });

    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all food items

export const getFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//delete food item
export const deleteFoodItem = async (req, res) => {
  try {
    const food = await foodModel.findById(req.query.id);
    if (food) {
      const filePath = `uploads/${food.image}`;
      fs.access(filePath, fs.constants.F_OK, async (err) => {
        if (err) {
          console.log(`File does not exist: ${filePath}`);
        } else {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(`Error deleting file: ${err.message}`);
              return res.status(500).json({ success: false, error: err.message });
            }
          });
        }

        // Delete the item from the database
        await foodModel.findOneAndDelete({ _id: req.query.id });
        res.json({ success: true, message: "Food item removed" });
      });
    } else {
      res.status(404).json({ success: false, message: "Food item not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};