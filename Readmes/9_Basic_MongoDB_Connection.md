# Basic Mongodb Connection and Mongodb program

```javascript
const express = require("express");
const fs = require("fs");
const app = express();
const data = require("./MOCK_DATA.json");
const PORT = 8000;
const mongoose = require("mongoose");

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/piyush")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    reqiured: true,
  },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  job_title: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers
      .map(
        (user) =>
          `<li>${user.first_name}   ${user.last_name} - ${user.email}</li>`
      )
      .join("")}
    </ul>
    `;
  res.send(html);
});

app.post("/api/users", async (req, res) => {
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
      return res.status(400).json({ msg: "Email already exists", error });
    }
    console.error(error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  return res.json(user);
});

app.patch("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" });
  return res.json({ status: "success" });
});

app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  return res.json({ status: "success" });
});

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
```
