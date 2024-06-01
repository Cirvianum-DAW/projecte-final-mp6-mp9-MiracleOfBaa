const express = require('express')
const cors = require('cors')
const { join } = require('path')

const authRoutes = require('./routes/auth.routes.js')
const agentsRoutes = require('./routes/agents.routes.js')

const app = express()
const port = 3000

app.set('port', port)

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json())

app.use(cors())

// Rutas
app.use('/auth', authRoutes)
app.use('/agents', agentsRoutes)

// Public
app.use('/images', express.static(join(__dirname, 'images')))
app.use('/videos', express.static(join(__dirname, 'videos')))

app.use((error, _req, res, _next) => {
  console.log(_next)
  res.status(500).send(error.message)
})

module.exports = app
