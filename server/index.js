const express = require('express')
const path  = require('path')
const expressLogging = require('express-logging')
var morgan = require('morgan')
const cors = require('cors')

const { PORT } = require('./src/util/config')
const { connectToDatabase } = require("./src/util/db")


// Define routes
const signinRouter = require('./src/routes/signin')
const loginRouter = require('./src/routes/login')
const userRouter = require('./src/routes/users')
const mapRouter = require('./src/routes/maps')



const app = express()

app.use(express.json())
app.use(morgan('combined'))

app.use(cors())

// Apply routes
app.use("/api/signin", signinRouter)
app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)
app.use("/api/maps", mapRouter)


// Serve frontend
app.use(express.static('public'))
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Catch undefined routes
app.use((_, res) => {
  res.status(404).json({error: "Route does not exist" })
});

// Initialize db and start server
const start = async () => {
  connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start();