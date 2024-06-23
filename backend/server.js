import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

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

// module -> controle -> model -> server⏎