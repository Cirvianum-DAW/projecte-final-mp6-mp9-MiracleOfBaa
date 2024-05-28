window.logout = function () {
  localStorage.removeItem('baa_session')
  location.reload()
}

function decodeJWT (token) {
  const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(
    decodeURIComponent(
      atob(payload)
        .split('')
        .map(char => {
          return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  )
}

function Navbar () {
  const nav = document.createElement('nav')
  nav.className = 'bg-black bg-cover p-5 text-center relative z-10'
  nav.innerHTML += `
  <a
    href="/About.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >About</a
  >
  <a
    href="/src/index.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Home</a
  >
  <a
    href="/Agents.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Agents</a
  >
  <a
    href="/Contact.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Contact</a
  >
  <a
    href="/News.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >News</a
  >
  <a
        href="/Info.html"
        class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
        >Info</a
      >
  `
  if (localStorage.getItem('baa_session') === null) {
    nav.innerHTML += `
  <a
  href="/Login.html"
  class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
  >Login</a>
  <a
  href="/Register.html"
  class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
  >Register</a>
  `
  }
  if (localStorage.getItem('baa_session') !== null) {
    const token = decodeJWT(localStorage.getItem('baa_session'))
    if (token.role === 'admin') {
      nav.innerHTML += `
      <a
      href="/result.html"
      class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
      >Result</a>
      <a
        href="/Users.html"
        class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
        >Users</a
      >
      `
    }
    nav.innerHTML += `
    <a
    href="/Profile.html"
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
