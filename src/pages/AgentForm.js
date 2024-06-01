document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('createForm').addEventListener('submit', function (e) {
    e.preventDefault()
    const form = document.forms.createForm
    const formData = new FormData(form)
    console.log(formData)
  })
})
