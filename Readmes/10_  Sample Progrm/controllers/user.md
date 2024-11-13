```javascript
const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastname: "Changed" });
  return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user", error });
  }
}

async function handleCreateNewUser(req, res) {
  try {
    const body = req.body;

    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });

    return res.status(201).json({ msg: "User created successfully", result });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error
      return res.status(400).json({ msg: "Email already exists", error });
    }
    res.status(500).json({ msg: "Error creating user", error });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
```
