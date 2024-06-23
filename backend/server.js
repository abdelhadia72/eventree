import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import eventRouter from './routes/events.js'
import cors from 'cors'
import userRouter from "./routes/user.js";

const port = process.env.PORT || 5000
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// show what's server is getting
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.path}`)
    next()
})

// routes for events
app.use("/api/events", eventRouter)
app.use("/api/users", userRouter)

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