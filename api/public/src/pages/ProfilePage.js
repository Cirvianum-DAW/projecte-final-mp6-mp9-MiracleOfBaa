async function changeProfile () {
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
  const res = await fetch(`${window.API_URL}/auth/profile`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('baa_session')}`,
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
    location.reload()
  } else {
    const json = await res.json()
    alert(json.error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const token = window.decodeJWT(localStorage.getItem('baa_session'))
  document.getElementById('username').value = token.username
  document
    .getElementById('saveChanges')
    .addEventListener('click', changeProfile)
})
