const express = require('express')
const path  = require('path')
const expressLogging = require('express-logging')
const logger = require('logops')

const { PORT } = require('./src/util/config')
const { connectToDatabase } = require("./src/util/db")


// Routes
const signinRouter = require('./src/routes/signin')
const loginRouter = require('./src/routes/login')


const app = express()

app.use(express.json())
app.use(expressLogging(logger));

app.use("/api/signin", signinRouter)
app.use("/api/login", loginRouter)

// Serve frontend
app.use(express.static('public'))
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Initialize db and start server
const start = async () => {
  connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start();