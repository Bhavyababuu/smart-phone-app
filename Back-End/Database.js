const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
