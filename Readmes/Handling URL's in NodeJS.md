# Handling URL's in NodeJS

```
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

```

#output

```
npm start
PS C:\Users\mogil\Desktop\Piyush_Node_JS> npm start

> com.manikanta@1.0.0 start
> node index.js

Server is running on port 8000
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=%22manikanta%22',
  query: [Object: null prototype] { name: '"manikanta"' },
  pathname: '/about',
  path: '/about?name=%22manikanta%22',
  href: '/about?name=%22manikanta%22'
}
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: [Object: null prototype] {},
  pathname: '/favicon.ico',
  path: '/favicon.ico',
  href: '/favicon.ico'
}
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=manikanta',
  query: [Object: null prototype] { name: 'manikanta' },
  pathname: '/about',
  path: '/about?name=manikanta',
  href: '/about?name=manikanta'
}
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: [Object: null prototype] {},
  pathname: '/favicon.ico',
  path: '/favicon.ico',
  href: '/favicon.ico'
}
Terminate batch job (Y/N)? y

```

![](https://media.geeksforgeeks.org/wp-content/uploads/20210625160610/urldiag.PNG)
