import express from "express";
import { configDotenv } from "dotenv";
import connectMongoDb from "./config/connection.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/user.routes.js";
import RoomRouter from "./routes/room.routes.js";
const app = express();

configDotenv()

connectMongoDb()
const port = process.env.port
// connect MongoDb
// connectMongoDb().then(()=> console.log("mongo db connected"))

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth/", authRouter);
app.use("/api/room/", RoomRouter)

app.listen(port, ()=> console.log(`server started at port ${port}`));





