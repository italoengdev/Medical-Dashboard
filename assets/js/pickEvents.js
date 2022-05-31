function pickName() {
  // mostra o contador de cliques dentro da div clicada
  patientName = event.target.textContent
  console.log(patientName)
  sessionStorage.setItem('chave', patientName)
  let menuAbrir = document.getElementById('pickName')
  if (menuAbrir) {
    menuAbrir.addEventListener('load', function () {
      window.onload.getElementById('pickName').textContent = data
    })
  }
}
data = sessionStorage.getItem('chave')

document.getElementById('pickName').textContent = data
// Store it in localstorage

// Get the value of your saved variable to use it elsewhere
console.log(data)


