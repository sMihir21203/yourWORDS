import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/index.middlewares.js";
import path from "path"

const app = express();
const __dirname=path.resolve()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// todo:
app.use(express.json({ limit: "25kb" }));
app.use(express.urlencoded({ extended: true, limit: "25kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import {
  commentRouter,
  postRouter,
  userRouter,
} from "./routes/index.routes.js";

//declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

app.use(express.static(path.join(__dirname,'/frontend/dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})

app.use(errorHandler);
export { app };
