import express from "express";
import User from "./../models/user.model.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(
      "Error occurred while fetching data from the database:",
      error,
    );
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("User data saved to database");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error occurred while saving data to database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT update an existing user
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error occurred while updating data to database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//  delete record from the database

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
  } catch (error) {
    console.error("Error occurred while deleting data to database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
