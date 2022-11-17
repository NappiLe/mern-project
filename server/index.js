require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const authRouter = require("./routes/auth")
const postRouter = require("./routes/post")

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://admin:Suomi2011.@mern-project.2fy9a8s.mongodb.net/?retryWrites=true&w=majority`
        )
        console.log(`MongoDB connected`)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

connectDB()

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))