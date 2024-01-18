import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import assetsRouter from "./router/assetsRouter.js"

dotenv.config();
const app = express();
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors({origin:true}));
app.use(express.json());


// ----- Router ----- //
app.use("/api/assets" , assetsRouter)
// app.listen(3000, () => console.log("Server running on port 3000"));


console.log(process.env.MONGO_URL)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    try {
      app.listen(port, () =>
        console.log(`Server running on http://localhost:${port}`)
      );
    } catch (error) {
      console.log(`Error in connecting => ${error}`);
    }
  })
  .catch((error) => {
    console.error(`Invalid database connection ${error}`);
  });
