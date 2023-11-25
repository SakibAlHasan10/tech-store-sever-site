const express = require("express");
const globalErrorHandler = require("./utils/globalErrorHandler");
const applyMiddleware = require("./middlewares/applyMiddleware");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const authenticationRouter= require("./routes/V1/authentication/index")

// middleware
applyMiddleware(app);

app.use(authenticationRouter)











// check server health
app.get("/health", (req, res) => {
  res.send("product hunt is running....");
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`The request url ${req.originalUrl} is invalid`);
  error.status = 404;
  next(error);
});

// error handling middleware
app.use(globalErrorHandler);

const main = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`product hunt Server is running on port ${port}`);
  });
};

main();
