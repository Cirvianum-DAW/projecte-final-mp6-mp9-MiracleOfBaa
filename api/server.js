const express = require('express')

const authRoutes = require('./routes/auth.routes.js')

const app = express()
const port = 3000

app.set('port', port)

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json())

// Rutas
app.use('/auth', authRoutes)

app.use((error, _req, res, _next) => {
  console.log(_next)
  res.status(500).send(error.message)
})

module.exports = app
