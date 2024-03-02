import mongoose from "mongoose";

const mongodbURL = "mongodb+srv://durgamabhilash798:bBBVw3ib6X9TwYf4@cluster0.spkjfe2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongodbURL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb not connnected");
});

db.on("connected", () => {
  console.log("mongodb connected");
});

export default db;
