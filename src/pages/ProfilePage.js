async function changeProfile (token) {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const res = await fetch(`${window.API_URL}/auth/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  if (res.status === 204) {
    alert('Profile saved successfully')
  } else {
    const json = await res.json()
    alert(json.error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const token = window.decodeJWT(localStorage.getItem('baa_session'))
  document.getElementById('username').value = token.username
  document.getElementById('saveChanges').addEventListener('click', async () => {
    await changeProfile(token)
  })
})
