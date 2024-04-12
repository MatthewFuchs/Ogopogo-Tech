const express = require('express');
const { fileUpload } = require('../controllers/fileController');
const router = express.Router();

router.post('/upload/:assignmentId', fileUpload);
router.get('/files', getAllFiles);
module.exports = router;
