async function changeProfile () {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
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
