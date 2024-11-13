```javascript
const fs = require("fs");
function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()} : ${req.url} New Req Recorded\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
```
