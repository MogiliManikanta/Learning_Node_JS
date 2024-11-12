# Remove the DB connection

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
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  // ip_address: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

app.use((req, res, next) => {
  console.log("hello I am middleware");
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}  : ${req.method}: ${req.ip}:${req.url} New Req Recorded\n`,
    (err, data) => {
      next();
    }
  );
});

app.use((req, res, next) => {
  console.log("hello I am middleware 2");
  next();
});

app.get("/api/users", (req, res) => {
  const html = `
    <ul>
    ${data.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.post("/api/users", (req, res) => {
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
  data.push({ ...body, id: data.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data));
  return res.status(201).json({ msg: "Success", id: data.length + 1 });
});

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
```
