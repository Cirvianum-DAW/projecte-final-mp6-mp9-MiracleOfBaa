async function fetchAgents (filter) {
  let filterQuery = filter ? `?filter=${filter}` : ''
  const res = await fetch(`${window.API_URL}/agents` + filterQuery, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('baa_session') || ''}`
    }
  })
  const json = await res.json()
  return json.agents
}

window.deleteAgent = async id => {
  const res = await fetch(`${window.API_URL}/agents/${id}`, {
    method: 'DELETE'
  })
  if (res.status !== 204) {
    return alert('Algo ha fallado intentando borrar el agente')
  }
  location.reload()
}

window.toggleLike = async id => {
  const res = await fetch(`${window.API_URL}/agents/like`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('baa_session')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      agentId: id
    })
  })
  if (res.status !== 204) {
    return alert('Algo ha ido mal con los likes')
  }
  location.reload()
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
                    ? `<i onclick="window.toggleLike('${agent.id}')" class="fa fa-heart ml-2 cursor-pointer ${agent.likedBy.includes(
                        token.id
                      )
                        ? 'text-red-500'
                        : 'text-gray-500'}"></i>`
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
                  <button onclick="window.deleteAgent('${agent.id}')" class="ml-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
                    <i class="fa fa-trash mr-1"></i>
                    Delete
                  </button>
              </div>
            `
              : ``}
            <div class="flex justify-between px-4 py-2">
                <a href="/pages/Agent.html?id=${agent.id}" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                  <i class="fa fa-eye mr-1"></i>
                  View Agent
                </a>
            </div>
        </div>
    `
  document.getElementById('agents').appendChild(div)
}

async function setAgents (token, filter) {
  document.getElementById('agents').innerHTML = ''
  const agents = await fetchAgents(filter)
  for (const agent of agents) {
    addAgent(token, agent)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let token = localStorage.getItem('baa_session')
  token = token !== null ? window.decodeJWT(token) : null
  if (token && token.role === 'admin') {
    document.getElementById('filters').innerHTML += `
      <a
      href="/pages/AgentForm.html"
      class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <i class="fa fa-plus mr-1"></i>
      Create Agent
    </a>
    `
  }
  await setAgents(token)
  document
    .getElementById('filterBy')
    .addEventListener('change', async function (e) {
      await setAgents(token, e.target.value)
    })
})
