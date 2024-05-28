function Navbar () {
  const nav = document.createElement('nav')
  nav.className = 'bg-black bg-cover p-5 text-center relative z-10'
  nav.innerHTML = `
  <a
    href="/About.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >About</a
  >
  <a
    href="/Agents.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Agents</a
  >
  <a
    href="/src/index.html"
    class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
    >Home</a
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
  <a
  href="/result.html"
  class="text-white mx-4 my-2 text-lg hover:text-gray-300 hover:bg-gray-700 transition rounded-full py-2 px-4"
  >Result</a>`
  return nav
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = Navbar()
  document.body.insertBefore(nav, document.body.firstChild)
})
