const API_URL = 'https://4dmv3bhs-3000.uks1.devtunnels.ms'

document.getElementById('register').addEventListener('click', async () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  console.log(res.status)
  if (res.status === 201) {
    location.href = '/Login.html'
  } else {
    const json = await res.json()
    alert(json.error)
  }
})
