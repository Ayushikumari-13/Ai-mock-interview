require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// ✅ 1. DB connect
connectDB();

// ✅ 2. Middleware (PEHLE lagta hai)
app.use(cors());
app.use(express.json());

// ✅ 3. Routes import
const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// ✅ 4. Routes use
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ 5. Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ 6. Error handling (IMPORTANT)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong ❌" });
});

// ✅ 7. Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});