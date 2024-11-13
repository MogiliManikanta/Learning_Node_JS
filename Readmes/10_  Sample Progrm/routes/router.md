```javascript
const express = require("express");
const User = require("../models/user");
const fs = require("fs");
// const { handleGetUserById } = require("../controllers/user");
const router = express.Router();
const {
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleCreateNewUser,
} = require("../controllers/user");

// Render HTML list of all users
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);
// Routes for single user operations
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

// Create a new user

module.exports = router;
```
