const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} New Req Recorded\n`;
  // non blocking request
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Welcome to Home Page");
        break;
      case "/about":
        const ysername = myUrl.query.name;
        res.end(`Welcome to ${ysername} Page`);
        break;
      case "/search":
        const search = myUrl.query.search_qury;
        res.end(`Welcome to ${search} Page`);
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
