```javascript
const express = require("express");
const userRouter = require("./routes/router"); // Import the user routes
const { connectMongoDb } = require("./connection");
const app = express();
const PORT = 8000;
const { logReqRes } = require("./middlewares/index");

// MongoDB Connection
connectMongoDb("mongodb://localhost:27017/piyush");
// Middleware- plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("./log.txt"));
// Routes
app.use("/api/users", userRouter); // Use the userRouter for /api/users prefix

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```
