async function fetchAgent (id) {
  const res = await fetch(`${window.API_URL}/agents/${id}`)
  const json = await res.json()
  return json.agent
}

document.addEventListener('DOMContentLoaded', async () => {
  const agentId = location.search.split('?id=')[1]
  const agent = await fetchAgent(agentId)
  document.title = agent.name
  document.getElementById('imagen').src = window.API_URL + agent.photo
  document.getElementById('wallpaper').src = window.API_URL + agent.wallpaper
  document.getElementById('nombre').textContent = agent.name
  document.getElementById('descripcion').innerHTML = agent.description
  document.getElementById('qHeader').textContent = agent.q.header
  document.getElementById('qBody').innerHTML += agent.q.body
  document.getElementById('qVideo').src = window.API_URL + agent.q.video
  document.getElementById('eHeader').textContent = agent.e.header
  document.getElementById('eBody').innerHTML += agent.e.body
  document.getElementById('eVideo').src = window.API_URL + agent.e.video
  document.getElementById('cHeader').textContent = agent.c.header
  document.getElementById('cBody').innerHTML += agent.c.body
  document.getElementById('cVideo').src = window.API_URL + agent.c.video
  document.getElementById('xHeader').textContent = agent.x.header
  document.getElementById('xBody').innerHTML += agent.x.body
  document.getElementById('xVideo').src = window.API_URL + agent.x.video
})
