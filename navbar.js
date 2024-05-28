// navbar.js

// Función para actualizar el navbar según el estado de inicio de sesión y el rol del usuario
function updateNavbar() {
  const isLoggedIn = true; // Simulación de usuario logeado (cambiar a false para simular usuario no logeado)
  const isAdmin = false; // Simulación de usuario administrador

  const navbar = document.querySelector('.navbar');
  const loginLink = document.querySelector('.navbar .login');
  const registerLink = document.querySelector('.navbar .register');
  const profileLink = document.querySelector('.navbar .profile');
  const logoutLink = document.querySelector('.navbar .logout');
  const adminLink = document.querySelector('.navbar .admin');

  // Mostrar las opciones del navbar según el estado de inicio de sesión y el rol del usuario
  if (isLoggedIn) {
    loginLink.classList.add('hidden');
    registerLink.classList.add('hidden');
    profileLink.classList.remove('hidden');
    logoutLink.classList.remove('hidden');

    if (isAdmin) {
      adminLink.classList.remove('hidden');
    } else {
      adminLink.classList.add('hidden');
    }
  } else {
    loginLink.classList.remove('hidden');
    registerLink.classList.remove('hidden');
    profileLink.classList.add('hidden');
    logoutLink.classList.add('hidden');
    adminLink.classList.add('hidden');
  }
}

// Llama a la función para actualizar el navbar cuando se carga la página
updateNavbar();
