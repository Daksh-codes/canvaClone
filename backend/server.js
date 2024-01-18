import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import assetsRouter from "./router/assetsRouter.js"
import Asset from "./model/assetsModel.js";

let assetsArray = [
  {
    name: 'vision',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530137/vision.svg'
  },
  {
    name: 'writing',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530138/writing.svg'
  },
  {
    name: 'operation',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530139/operation.svg'
  },
  {
    name: 'calendar',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530140/calendar.svg'
  },
  {
    name: 'chemical',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530141/chemical.svg'
  },
  {
    name: 'biology',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530142/biology.svg'
  },
  {
    name: 'certificate',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530143/certificate.svg'
  },
  {
    name: 'school',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530144/school.svg'
  },
  {
    name: 'raise-your-hand',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530145/raise-your-hand.svg'
  },
  {
    name: 'read',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530146/read.svg'
  },
  {
    name: 'physics',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530147/physics.svg'
  },
  {
    name: 'discover',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530148/discover.svg'
  },
  {
    name: 'math',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530149/math.svg'
  },
  {
    name: 'score',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530150/score.svg'
  },
  {
    name: 'space',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530151/space.svg'
  },
  {
    name: 'online-class',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530152/online-class.svg'
  },
  {
    name: 'attend-class',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530153/attend-class.svg'
  },
  {
    name: 'creativity',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530154/creativity.svg'
  },
  {
    name: 'difficulty',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530155/difficulty.svg'
  },
  {
    name: 'question-and-answer',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530156/question-and-answer.svg'
  },
  {
    name: 'mind',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530157/mind.svg'
  },
  {
    name: 'time',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530159/time.svg'
  },
  {
    name: 'astronomical',
    type: 'svg',
    svg: 'https://www.svgrepo.com/show/530160/astronomical.svg'
  }
]

// Asset.insertMany(assetsArray)
//   .then((result) => {
//     console.log('Assets added successfully:', result);
//   })
//   .catch((error) => {
//     console.error('Error adding assets:', error);
//   });

  // Asset.deleteMany({})
  // .then((result) => {
  //   console.log('All documents deleted successfully:', result);
  // })
  // .catch((error) => {
  //   console.error('Error deleting documents:', error);
  // });

dotenv.config();
const app = express();
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


app.use(cors({origin:true}));
app.use(express.json());
app.use(morgan("common"));


// ----- Router ----- //
app.use("/api/assets" , assetsRouter)
// app.listen(3000, () => console.log("Server running on port 3000"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


console.log(process.env.MONGO_URL)

const PORT = 5000

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    try {
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
    } catch (error) {
      console.log(`Error in connecting => ${error}`);
    }
  })
  .catch((error) => {
    console.error(`Invalid database connection ${error.message}`);
  });
