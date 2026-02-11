import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})
import { app } from "./app.js";
import connectDB from "./db/index.js";
const PORT=process.env.PORT || 8000;
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is listening to port ${PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDb connection error",err);
})