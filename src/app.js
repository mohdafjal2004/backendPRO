import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Configuring the cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Configuring the  server for accepting json(with max limit)
app.use(express.json({ limit: "26kb" }));

//For encoding special character in the URL like % , @ , +
app.use(express.urlencoded({ extended: true, limit: "26kb" }));

//For storing the assets on the server publicily like pdf,
//image or any type of file and "public" is the name of folder for
//storing these files
app.use(express.static("public"));

//For storing the secure-cookies in the browswer of user
//only server can read these or remove these secure-cookies
app.use(cookieParser());

//* After configuring app methods, now write all the routes
// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);

export { app };
