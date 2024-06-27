import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import eventRouter from './routes/events.js'
import cors from 'cors'
import userRouter from "./routes/user.js";
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 5000
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// show what's server is getting
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path}`)
    console.log(__dirname)
    next()
})

// routes for events
app.use("/api/events", eventRouter)
app.use("/api/users", userRouter)

//serve static file from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI, )
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log("Server is running on port " + port);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database: ", error);
        process.exit(1);
    });

// module -> controllers -> route -> server