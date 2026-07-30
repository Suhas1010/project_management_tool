import dotenv from "dotenv";
import app from "./app.js"
import connectDB from "./db/index.js"
const result = dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 3000

connectDB()
.then(()=>{
  app.listen(port,()=>{
    console.log(`Example app is listening on port http://localhost:${port}/`)
  })
})
.catch((err)=>{
  console.log("MongoDB connection error ",err);
})