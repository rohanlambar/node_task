import multer from 'multer'
import {v2 as cloudinary } from 'cloudinary'
import {CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'

dotenv.config()
// configuring cloud 
cloudinary.config({
    cloud_name :process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params:  (req, file) => ({
        folder: "uploads", // Cloudinary folder
        format: file.mimetype.split("/")[1], // Keep original format (jpg, png, etc.)
        public_id: `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`, // Unique filename
    }),

});

const upload =  multer({storage});

export {upload , cloudinary};
