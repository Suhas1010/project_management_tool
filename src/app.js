import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//basic configuration
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true,limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());
//cors configurations
app.use(cors({
    origin : process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials : true,
    methods : ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders : ["Content-Type","Authorization"],
}),
); 

//import  the routes

import healthCheckRouter from "./routes/healthcheck.routes.js"
app.use("/api/v1/healthcheck",healthCheckRouter)
app.get("/",(req,res)=>{
    res.send("Welcome to basecamp");
})

import authRouter from "./routes/auth.routes.js"
app.use("/api/v1/auth",authRouter);

import projectRouter from "./routes/project.routes.js";
app.use("/api/v1/projects",projectRouter);

import taskRouter from "./routes/task.routes.js";
app.use("/api/v1/tasks",taskRouter)
export default app;
