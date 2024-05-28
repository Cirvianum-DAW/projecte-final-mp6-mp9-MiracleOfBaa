// Datos simulados de usuario y agentes
const usersData = {
  username: "Usuario123",
  email: "usuario123@example.com"
};

let agentsData = ["Sova", "Jett", "Breach"];

// Función para mostrar la información del usuario
function showUserInfo() {
  document.getElementById("username").value = usersData.username;
  document.getElementById("email").value = usersData.email;
}

// Función para mostrar los agentes favoritos
function showFavoriteAgents() {
  const favoriteAgentsList = document.getElementById("favoriteAgents");
  favoriteAgentsList.innerHTML = "";
  agentsData.forEach(agent => {
      const li = document.createElement("li");
      li.textContent = agent;
      favoriteAgentsList.appendChild(li);
  });
}

// Función para manejar la edición de perfil
function editProfile(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  // Aquí podrías enviar los datos actualizados al servidor si fuera necesario
  alert(`Perfil actualizado:\nNombre de Usuario: ${username}\nCorreo Electrónico: ${email}`);
}

// Función para añadir un nuevo agente
function addAgent(event) {
  event.preventDefault();
  const agentName = document.getElementById("agentName").value;
  
  // Aquí podrías enviar los datos del nuevo agente al servidor si fuera necesario
  agentsData.push(agentName);
  showFavoriteAgents();
  document.getElementById("addAgentForm").reset(); // Limpiar el formulario después de añadir un agente
}

// Mostrar información del usuario y agentes favoritos al cargar la página
window.onload = function() {
  showUserInfo();
  showFavoriteAgents();

  // Manejar la edición de perfil cuando se envíe el formulario
  const editProfileForm = document.getElementById("editProfileForm");
  editProfileForm.addEventListener("submit", editProfile);

  // Manejar la adición de un nuevo agente cuando se envíe el formulario
  const addAgentForm = document.getElementById("addAgentForm");
  addAgentForm.addEventListener("submit", addAgent);
};
