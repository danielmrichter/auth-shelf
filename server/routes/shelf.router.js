const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../modules/cloudinary')


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'auth_images',
  }
})

const upload = multer({ storage: storage });

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  sqlText = `
    SELECT * FROM "item"
    ORDER BY "id";`
  
  pool.query(sqlText)
  .then((result) => {
    res.send(result.rows)
  }) .catch((error) => {
    console.log('Server GET error:', error);
    res.sendStatus(500);
  })
});
// GET my items to my shelf
router.get('/:id', rejectUnauthenticated, (req, res) => {
  sqlText = `
  SELECT * FROM "item"
  WHERE "user_id" = $1;
  `
  sqlValues = [req.user.id]

  pool.query(sqlText, sqlValues)
  .then((result) => {
    res.send(result.rows)
  }) .catch((err) => {
    console.log('Server GET error:', err)
    res.sendStatus(500)
  })
})

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log('item being added is:', req.body, 'with user:', req.user.id)
const query = `
INSERT INTO "item"
  ("description", "image_url", "user_id")
  VALUES
  ($1, $2, $3)
`
const sqlValues = [req.body.description, req.body.image_url, req.user.id]

pool.query(query, sqlValues)
.then (result => {
  res.sendStatus(200)
})
.catch(error => {
  console.log('Server error posting item:', error)
  res.sendStatus(500)
})
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "item"
    WHERE "id" = $1`;
  const sqlValues = [req.params.id];
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => res.sendStatus(200))
    .catch((dbErr) => {
      console.log(`SQL Error in DELETE/api/shelf`, dbErr);
      res.sendStatus(500);
    });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
});


// router.post('/upload', upload.single('file', async (req, res) => {
//   console.log('This is req.file:', req.file);
//   try {
//       console.log('OMG! ITS COMING THRU:', req.file.path);
//       // res.json(req.file.path)
//   } catch (error) {
//       console.log('SERVER upload error:', error);
//   }
// }))

module.exports = router;
