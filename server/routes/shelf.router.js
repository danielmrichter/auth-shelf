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
  // endpoint functionality
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
      console.log(`SQL Error in DELETE/api/shelf`);
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

module.exports = router;
