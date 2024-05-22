export function renderNavbar(isLoggedIn = false, isAdmin = false) {
    if (!document.querySelector('.navbar')) {
      const navbar = document.createElement('nav');
      // This is a way to keep my navbar fixed at the top of the page
      navbar.classList.add('w-full', 'mb-10', 'bg-white', 'shadow-md', 'text-lg');
  
      let links = `
      <li><a href="index.html" class="text-blue-500 font-bold hover:text-blue-700">Home</a></li>
    `;
  
      if (isLoggedIn) {
        links += `
      <li><a href="dashboard.html" class="text-blue-500 font-bold hover:text-blue-700">Dashboard</a></li>
      <li><a href="logout.html" class="btn btn-primary bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Logout</a></li>
    `;
      } else {
        links += `
        <li><a href="login.html" class="btn btn-primary bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Login</a></li>
      `;
      }
  
      if (isAdmin) {
        links += `
        <li><a href="admin.html" class="btn btn-primary bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Admin</a></li>
      `;
      }
  
      navbar.innerHTML = `
      <ul class="flex justify-between items-center p-4">
        ${links}
      </ul>
    `;
  
      document.body.prepend(navbar);
    }
  }
  