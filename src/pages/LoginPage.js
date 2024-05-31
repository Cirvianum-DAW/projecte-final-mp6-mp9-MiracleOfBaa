const API_URL = 'https://4dmv3bhs-3000.uks1.devtunnels.ms'

document.getElementById('login').addEventListener('click', async () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  if (res.status === 200) {
    const json = await res.json()
    localStorage.setItem('baa_session', json.token)
    location.href = '/index.html'
  } else {
    const json = await res.json()
    alert(json.error)
  }
})
