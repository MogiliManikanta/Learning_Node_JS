# Basic Routing

```javascript
const express = require("express");
const data = require("./MOCK_DATA.json");
const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.json(data);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${data.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.find((user) => user.id === id);
  res.send(user);
});

app.listen(PORT, () => console.log("Server started on port 8000"));
```
