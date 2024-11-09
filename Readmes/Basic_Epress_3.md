# Sample Program

```javascript
const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from home page");
});

app.get("/about", (req, res) => {
  return res.send(
    "Hello from about page" + req.query.name + " you are " + req.query.age
  );
});

const myServer = http.createServer(app);

myServer.listen(8000, () => console.log("Server started on port 8000"));
```
