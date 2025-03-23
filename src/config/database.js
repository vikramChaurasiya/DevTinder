
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vikramkrchaurasiya:Vikram@namastedev.jecfp.mongodb.net/devTinderAPI=true&w=majority&appName=NamasteDev", {
      dbName: "DevTinderAPI",
    });
    console.log("MongoDB Connected Successfully...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
