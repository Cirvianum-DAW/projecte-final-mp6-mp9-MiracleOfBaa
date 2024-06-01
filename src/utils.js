//window.API_URL = 'http://localhost:3000'
window.API_URL = 'https://4dmv3bhs-3000.uks1.devtunnels.ms'

window.decodeJWT = token => {
  const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(
    decodeURIComponent(
      atob(payload)
        .split('')
        .map(char => {
          return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  )
}
