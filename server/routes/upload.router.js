const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
const cloudinary = require('../modules/cloudinary')
const pool = require("../modules/pool");
const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'auth_images',
    }
})

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        console.log('This is req.body:', req.body.description);
        console.log('This is req.file:', req.file);
        sqlText = `
        INSERT INTO "item"
        ("description", "image_url", "user_id")
        VALUES
        ($1, $2, $3);`

        sqlValues = [req.body.description, req.file.path, req.user.id]
        pool.query(sqlText, sqlValues)
        .then((result) => {
            console.log('SERVER posted data');
            res.sendStatus(201);
        }) .catch((err) => {
            console.log('SERVER error in POST img:', err);
            res.sendStatus(500);
        })

        // console.log('OMG! ITS COMING THRU:', req.file.path);
    } catch (error) {
        console.log('SERVER upload error:', error);
    }
})

module.exports = router;