const app = require('./server.js')

// Iniciar el servidor
app.listen(app.get('port'), () => {
  console.log(
    `Servidor en funcionamiento en http://localhost:${app.get('port')}`
  )
})
