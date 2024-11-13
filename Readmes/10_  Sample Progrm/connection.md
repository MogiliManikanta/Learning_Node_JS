```javascript
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("MongoDB Error:", err));
}

module.exports = { connectMongoDb };
```
