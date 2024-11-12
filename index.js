const express = require("express");
const fs = require("fs");
const app = express();
const data = require("./MOCK_DATA.json");
const PORT = 8000;

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
