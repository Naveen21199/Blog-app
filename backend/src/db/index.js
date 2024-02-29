import mongosee from "mongoose";
import { DB_NAME } from "../contants.js";
const connectDb = async () => {
  try {
    const connectionInstance = await mongosee.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `Mongodb Connected ?? DB HOST : ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log(`MongoDB connnection error`, error);
    process.exit(1);
  }
};

export default connectDb;
