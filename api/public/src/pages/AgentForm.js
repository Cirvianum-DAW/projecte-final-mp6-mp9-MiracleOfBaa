document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('createForm')
    .addEventListener('submit', async function (e) {
      e.preventDefault()
      const form = document.forms.createForm
      const formData = new FormData(form)
      await fetch(`${window.API_URL}/agents`, {
        method: 'POST',
        body: formData
      })
    })
})
