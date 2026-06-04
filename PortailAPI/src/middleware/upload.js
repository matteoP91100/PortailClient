const multer = require("multer");

const fs = require("fs");

const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}
// stockage disque
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;