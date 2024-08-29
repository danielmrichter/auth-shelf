const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/session-middleware.js");

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  res.sendStatus(200); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", (req, res) => {
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
// router.delete("/:id", rejectUnauthenticated, (req, res) => {
//   const sqlText = `DELETE FROM "item"
//     WHERE "id" = $1`;
//   const sqlValues = [req.params.id];
//   pool
//     .query(sqlText, sqlValues)
//     .then((dbRes) => res.sendStatus(200))
//     .catch((dbErr) => {
//       console.log(`SQL Error in DELETE/api/shelf`);
//       res.sendStatus(500);
//     });
// });

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

module.exports = router;
