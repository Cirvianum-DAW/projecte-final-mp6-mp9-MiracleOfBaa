document.getElementById('login').addEventListener('click', async () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const res = await fetch(`${window.API_URL}/auth/login`, {
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
    location.href = '/'
  } else {
    const json = await res.json()
    alert(json.error)
  }
})
