# Basic Creation of Server in node js

```javascript
const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} New Req Recorded\n`;
  // non blocking request
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Welcome to Home Page");
        break;
      case "/about":
        res.end("Welcome to About Page");
        break;
      case "/contact":
        res.end("Welcome to Contact Page");
        break;
      default:
        res.end("404 Page Not Found");
    }
  });
});
myServer.listen(8000, () => {
  console.log("Server is running on port 8000");
});
```

# Project Title
