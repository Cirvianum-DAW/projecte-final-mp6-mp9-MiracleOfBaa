document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('createForm')
    .addEventListener('submit', async function (e) {
      e.preventDefault()
      const form = document.forms.createForm
      const formData = new FormData(form)
      const res = await fetch(`${window.API_URL}/agents`, {
        method: 'POST',
        body: formData
      })
      if (res.status === 201) alert('Agent has been created')
      location.href = '/pages/Agents.html'
    })
})
