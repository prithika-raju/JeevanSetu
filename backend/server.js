const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const bloodRoutes = require("./routes/blood");


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", authRoutes)
app.use("/api", bloodRoutes);


app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000")
})
