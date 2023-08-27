// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET',
  public_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  
});

export default cloudinary;
