async function fetchAgent (id) {
  const res = await fetch(`${window.API_URL}/agents/${id}`)
  const json = await res.json()
  return json.agent
}

document.addEventListener('DOMContentLoaded', async () => {
  const agentId = location.search.split('?id=')[1]
  const agent = await fetchAgent(agentId)
  document.getElementById('agentId').value = agent.id
  document.getElementById('type').value = agent.type
  document.getElementById('name').value = agent.name
  document.getElementById('description').value = agent.description
  document.getElementById('q_header').value = agent.q.header
  document.getElementById('q_body').value = agent.q.body
  document.getElementById('e_header').value = agent.e.header
  document.getElementById('e_body').value = agent.e.body
  document.getElementById('c_header').value = agent.c.header
  document.getElementById('c_body').value = agent.c.body
  document.getElementById('x_header').value = agent.x.header
  document.getElementById('x_body').value = agent.x.body
  document
    .getElementById('createForm')
    .addEventListener('submit', async function (e) {
      e.preventDefault()
      const form = document.forms.createForm
      const formData = new FormData(form)
      const res = await fetch(`${window.API_URL}/agents`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agentId: document.getElementById('agentId').value,
          type: document.getElementById('type').value,
          name: document.getElementById('name').value,
          description: document.getElementById('description').value
        })
      })
      if (res.status === 204) alert('Agent has been updated')
      location.href = '/pages/Agents.html'
    })
})
