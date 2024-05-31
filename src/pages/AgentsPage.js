const API_URL = 'https://4dmv3bhs-3000.uks1.devtunnels.ms'

async function fetchAgents () {
  const res = await fetch(`${API_URL}/agents`)
  const json = await res.json()
  return json.agents
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

function addAgent (token, agent) {
  const div = document.createElement('div')
  div.className =
    'w-1/5 transition duration-300 ease-in-out transform hover:scale-105'
  div.innerHTML = `
        <div class="form bg-gray-800 rounded-lg overflow-hidden shadow-md flex flex-col p-3">
            <img src="${agent.photo}" alt="${agent.name}" class="w-full h-48 object-contain">
            <div class="p-4">
                <h3 class="text-white text-lg font-semibold">${agent.name}
                  ${token
                    ? '<i class="fa fa-heart ml-2 text-gray-500 cursor-pointer"></i>'
                    : ''}
                </h3>
            </div>
            ${token && token.role === 'admin'
              ? `
              <div class="flex justify-between p-4">
                  <button class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out">
                    <i class="fa fa-pencil mr-1"></i>
                    Edit
                  </button>
                  <button class="ml-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
                    <i class="fa fa-trash mr-1"></i>
                    Delete
                  </button>
              </div>
            `
              : ``}
            <div class="flex justify-between px-4 py-2">
                <a href="/Agent.html?id=${agent.id}" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                  <i class="fa fa-eye mr-1"></i>
                  View Agent
                </a>
            </div>
        </div>
    `
  document.getElementById('agents').appendChild(div)
}

document.addEventListener('DOMContentLoaded', async () => {
  const agents = await fetchAgents()
  let token = localStorage.getItem('baa_session')
  token = token !== null ? decodeJWT(token) : null
  for (const agent of agents) {
    addAgent(token, agent)
  }
})
