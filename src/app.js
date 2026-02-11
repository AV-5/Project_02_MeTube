import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app=express();
app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)
//commom middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import healthcheckRouter from "./routes/healthcheckRoutes.js"
import { errorHandler } from './middlewares/error.middleware.js';
import userRouter from './routes/user.routers.js';
//routes
app.use("/api/v1/healthcheck",healthcheckRouter)
app.use("/api/v1/users",userRouter)
app.use(errorHandler)
export {app}
