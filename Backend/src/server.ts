import express from "express";
import dontenv from 'dotenv'
import { connectDb } from "./config/db";
import ProjectRoutes from './routes/ProjectRoutes'



dontenv.config()
connectDb()


const app = express()
app.use(express.json())

app.use('/projects', ProjectRoutes)
app.use('/auth', ProjectRoutes)



export default app