import express from "express";
import dontenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from "./config/cors";
import { connectDb } from "./config/db";
import ProjectRoutes from './routes/ProjectRoutes'
import AuthRoutes from './routes/AuthRoutes'



dontenv.config()
connectDb()

const app = express()
app.use(express.json())
app.use(cors(corsConfig))

app.use('/projects', ProjectRoutes)
app.use('/auth', AuthRoutes)



export default app