import dotenv from "dotenv";
import connectDB from "./db/index.db.js";
import {app} from "./app.js"

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on ${process.env.PORT} port`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connect err: ${err}`);
  });
