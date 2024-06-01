window.logout = function () {
  localStorage.removeItem('baa_session')
  location.href = '/'
}

function Navbar () {
  const nav = document.createElement('nav')
  nav.className = 'bg-black bg-cover p-5 text-center relative z-10'
  nav.innerHTML += `
  <a
    href="/pages/About.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >About</a
  >
  <a
    href="/"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Home</a
  >
  <a
    href="/pages/Agents.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Agents</a
  >
  <a
    href="/pages/Contact.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Contact</a
  >
  <a
    href="/pages/News.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >News</a
  >
  <a
        href="/pages/Info.html"
        class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
        >Info</a
      >
  `
  if (localStorage.getItem('baa_session') === null) {
    nav.innerHTML += `
  <a
  href="/pages/Login.html"
  class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
  >Login</a>
  <a
  href="/pages/Register.html"
  class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
  >Register</a>
  `
  }
  if (localStorage.getItem('baa_session') !== null) {
    const token = window.decodeJWT(localStorage.getItem('baa_session'))
    if (token.role === 'admin') {
      nav.innerHTML += `
      <a
      href="/pages/Result.html"
      class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
      >Result</a>
      `
    }
    nav.innerHTML += `
    <a
    href="/pages/Profile.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Profile</a>
    <a role="button" onclick="window.logout();"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Logout</a>
    `
  }
  return nav
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = Navbar()
  document.body.insertBefore(nav, document.body.firstChild)
})
