import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRoute from "./routes/foodRoute.js"


const app = express()

app.use(express.json())
const port = 4000

app.use(express.json())
app.use(cors())

connectDB()

//api endpoint
app.use("/api/food", foodRoute)
app.use("/uploads", express.static("uploads"))
app.get("/", (req, res) => {
  res.send("Api is running")
})  

app.listen(port, () => {
    console.log(`Server is running on port  http://localhost:${port}`)
    })

// toDPMXUuJbcJ1x66

