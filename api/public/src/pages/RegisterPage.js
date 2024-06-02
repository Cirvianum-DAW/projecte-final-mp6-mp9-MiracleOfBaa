document.getElementById('register').addEventListener('click', async () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  if (username.length < 5) {
    return alert('Username length must be at least 5 characters')
  }
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\\.,\\(){}[\]"'_-])[A-Za-z\d@$!%*?&\\.,\\(){}[\]"'_-]{8,}$/.test(
      password
    )
  ) {
    return alert(
      'Password must contain at least 8 characters including one number, one symbol and one uppercase letter'
    )
  }
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
  if (res.status === 201) {
    location.href = '/pages/Login.html'
  } else {
    const json = await res.json()
    alert(json.error)
  }
})
