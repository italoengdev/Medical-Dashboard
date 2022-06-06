function pickName() {
  // mostra o contador de cliques dentro da div clicada
  patientName = event.target.textContent
  console.log(patientName)
  sessionStorage.setItem('chave', patientName)

}
data = sessionStorage.getItem('chave')

// Store it in localstorage

// Get the value of your saved variable to use it elsewhere
console.log(data)

const url = `https://cm42-medical-dashboard.herokuapp.com/patients`

    fetch(url)
      .then(response => response.json())
      .then(pacients => {
        objectSelectedByNameId = findByName(pacients, data)
        sessionStorage.setItem('id', objectSelectedByNameId.id)
        console.log(objectSelectedByNameId)
        console.log(sessionStorage.getItem('id'));
      })

      

// Saving local id to relate with other array




function findByName(source, name) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].name === name) {
      return source[i]
    }
  }
  throw "Couldn't find object with id: " + name
}
