const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const usersFilePath = './users.json';

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Función para leer usuarios desde el archivo JSON
function getUsers() {
  try {
    const usersData = fs.readFileSync(usersFilePath);
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
}

// Función para guardar usuarios en el archivo JSON
// users.js
function saveUsers(users) {
  const usersJSON = JSON.stringify(users, null, 2);
  fs.writeFileSync(usersFilePath, usersJSON);
}


// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

module.exports = { saveUsers };