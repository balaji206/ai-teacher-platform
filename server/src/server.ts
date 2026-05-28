import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import groupRoutes
from "./routes/groupRoutes";
import authRoutes
from "./routes/authRoutes";
import toolkitRoutes
from "./routes/toolkitRoutes";
import teacherRoutes
from "./routes/teacherRoutes";
import libraryRoutes
from "./routes/libraryRoutes";
import mongoose from "mongoose";
import assignmentRoutes from "./routes/assignmentRoutes";
import "./workers/questionWorkers";
const app = express();

app.use(

  cors({

     origin: [

       "http://localhost:3000",

       "https://ai-teacher-platform-seven.vercel.app/"

     ],

     credentials: true

  })

);
app.use(express.json());

mongoose.connect(process.env.MONGO_URL as string)
.then(()=>console.log("MongoDB Connected"))
.catch((error)=>console.log("MongoDB connection error",error))

app.use('/assignments',assignmentRoutes);
console.log(process.env.REDIS_PORT);

app.use(
 "/groups",
 groupRoutes
);

app.use(
 "/toolkits",
 toolkitRoutes
);
app.use(
 "/teacher",
 teacherRoutes
);
app.use(
 "/library",
 libraryRoutes
);
app.get("/", (req, res) => {

  res.send("VedaAI Backend Running 🚀");

});
app.use(
 "/uploads",
 express.static(
   "src/uploads"
 )
);

app.use(
 "/auth",
 authRoutes
);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})