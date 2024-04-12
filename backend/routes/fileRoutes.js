const express = require('express');
const multer = require('multer');
const { fileUpload, getAllFiles } = require('../controller/fileController');

const storage = multer.diskStorage({
  // storage configuration
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/upload/:assignmentId', upload.single('assignmentFile'), fileUpload);
router.get('/files', getAllFiles);

module.exports = router;
