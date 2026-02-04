import express from "express"
import connectToDB from "./db/connectToDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";

const app=express();

app.use(express.json());
app.use(cookieParser());

const frontendUrl=process.env.FRONTEND_URL

app.use(cors({
    origin : frontendUrl,
    credentials:true,
}))
await connectToDB()


app.use("/user",authRouter);
app.use("/api/posts", postRoutes);

app.listen(3000,()=>console.log("Server started at port 3000"))