# Basic Post Method

```javascript
const express = require("express");
const data = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");

const PORT = 8000;
app.use(express.json());

app.get("/", (req, res) => {
  res.json(data);
});

app.get("/api/users", (req, res) => {
  const html = `
    <ul>
    ${data.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.find((user) => user.id === id);
  res.send(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  data.push({ ...body, id: data.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data, id);
      return res.json({ message: "success" });
    }
  });
});

app.listen(PORT, () => console.log("Server started on port 8000"));
```
