const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".pdf");
  },
});

const upload = multer({ storage });

// 📄 upload route
router.post("/", upload.single("resume"), (req, res) => {
  res.json({ file: req.file.filename });
});

module.exports = router;