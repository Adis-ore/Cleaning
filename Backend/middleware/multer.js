import multer from "multer";

// Set up storage engine with destination
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

// File filter for validation
const fileFilter = (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false);
    }
};

// Apply multer middleware with file filter and limits
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;
