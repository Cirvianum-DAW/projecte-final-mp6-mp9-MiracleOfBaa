// script.js

// Datos simulados de usuario y personajes favoritos
const userData = {
  username: "Usuario123",
  email: "usuario123@example.com"
};

const favoriteCharacters = ["Sova", "Jett", "Breach"];

// Función para mostrar la información del usuario
function showUserInfo() {
  const userInfoDiv = document.getElementById("userInfo");
  userInfoDiv.innerHTML = `
      <p><strong>Nombre de usuario:</strong> ${userData.username}</p>
      <p><strong>Correo electrónico:</strong> ${userData.email}</p>
  `;
}

// Función para mostrar los personajes favoritos
function showFavoriteCharacters() {
  const favoriteCharactersDiv = document.getElementById("favoriteCharacters");
  favoriteCharactersDiv.innerHTML = `<ul>`;
  favoriteCharacters.forEach(character => {
      favoriteCharactersDiv.innerHTML += `<li>${character}</li>`;
  });
  favoriteCharactersDiv.innerHTML += `</ul>`;
}

// Función para manejar la creación de un nuevo personaje
function createCharacter(event) {
  event.preventDefault();
  const characterName = document.getElementById("characterName").value;
  favoriteCharacters.push(characterName);
  showFavoriteCharacters();
  // Aquí podrías enviar los datos del nuevo personaje al servidor si fuera necesario
}

// Mostrar información del usuario y personajes favoritos al cargar la página
window.onload = function() {
  showUserInfo();
  showFavoriteCharacters();

  // Manejar la creación de un nuevo personaje cuando se envíe el formulario
  const createCharacterForm = document.getElementById("createCharacterForm");
  createCharacterForm.addEventListener("submit", createCharacter);
};
