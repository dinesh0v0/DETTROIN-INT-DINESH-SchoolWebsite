/**
 * @file upload.js
 * @description Multer middleware using memoryStorage.
 * Files are held in memory as a Buffer, then manually streamed to MongoDB
 * GridFS in the controller. This avoids the multer-gridfs-storage compatibility
 * bug with newer MongoDB drivers (TypeError: Cannot read '_id' of undefined).
 */

const multer = require('multer');
const path = require('path');

// Allowed MIME types for resume uploads
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

// File filter — validates MIME type and extension
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_MIME_TYPES.includes(file.mimetype) && ALLOWED_EXTENSIONS.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are accepted.'), false);
  }
};

// Use memoryStorage — file is available as req.file.buffer in the controller
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

module.exports = upload;
