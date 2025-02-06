import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(
      `MongoDB Connected || DB HOST: ${mongoDBConnection.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connect failed Err: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
