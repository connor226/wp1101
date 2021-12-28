import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const mongo = mongoose.connection;
  mongo.once("open", () => {
    console.log("Mongo database connected!")
  })
  if(process.env.EXAM)  dataInit();
}

export default { connect };