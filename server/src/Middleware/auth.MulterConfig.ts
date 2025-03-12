import multer from "multer";
import path from "path";

// Configure Multer Storage
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/uploads"); // Ensure this folder exists
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize Upload Middleware
const upload = multer({ storage: storage });

export default upload; // ✅ Export the configured Multer instance
