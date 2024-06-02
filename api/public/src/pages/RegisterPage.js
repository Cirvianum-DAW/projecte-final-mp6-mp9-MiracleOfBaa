document.getElementById('register').addEventListener('click', async () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const res = await fetch(`${window.API_URL}/auth/register`, {
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
    location.href = '/pages/Login.html'
  } else {
    const json = await res.json()
    alert(json.error)
  }
})
