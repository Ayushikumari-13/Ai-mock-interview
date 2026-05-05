const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    // 🔥 Debug check (sabse important)
    console.log("👉 MONGO_URI:", uri);

    if (!uri) {
      throw new Error("MONGO_URI not found in .env file");
    }

    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;