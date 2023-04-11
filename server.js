import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// Do not need to use cors if using proxy on front-end (import cors from 'cors')
import Connection from "./Db/db.js";
import notFound from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ENV VAR
dotenv.config();
const url = process.env.url;
const PORT = process.env.PORT || 8000;

//Api Routes
app.get("/api/v1", (req, res) => {
  res.json({ msg: "Home Route" });
});

//Error Routes
app.use(notFound);
app.use(errorHandlerMiddleware);

//Database Connection
const start = async () => {
  try {
    await Connection(url);
    app.listen(PORT, () =>
      console.log(`Server is listening at PORT : ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
