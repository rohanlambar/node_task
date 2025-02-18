import express from 'express';
import multer from 'multer';
import fs from 'fs';

const app = express();
const uploadDir = "./uploads";

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

// Configure upload middleware
const upload = multer({ storage });

app.post('/api/upload', upload.array("product",5), (req, res) => {
    return res.status(200)
              .json({
        message : "files successfully uploaded ",
        files_info: req.files,
    });

});

app.listen(5000, () => console.log("Listening on port 5000"));
