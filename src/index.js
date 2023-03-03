import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlController.js";
import userRouter from "./routes/userRouter.js";

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.use([authRouter, urlRouter, userRouter])


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));