console.log('Searching pacients...')
//b.setAttribute('disabled', 'disabled')

var xhr = new XMLHttpRequest()

xhr.open('GET', 'https://cm42-medical-dashboard.herokuapp.com/patients')

xhr.addEventListener('load', function () {
  if (xhr.status == 200) {
    var response = xhr.responseText
    window.pacients = JSON.parse(response)
    console.log(pacients)

    novoArray = Array.from(pacients, ({ name }) => name)
    console.log(novoArray.sort())

    appoSortId = pacients.map(v => ({
      name: v.name,
      id: v.id
    }))

    function adicionaPacienteNaLista(paciente) {
      var pacienteList = montaLista(
        paciente,
        'dropdown-item',
        'patientPage.html',
        'test'
      )
      var list = document.querySelector('#sites')
      list.appendChild(pacienteList)
    }

    function montaLista(dado, classe, hRef, iD) {
      var optionFather = document.createElement('li')
      var option = document.createElement('a')
      optionFather.appendChild(option)

      option.textContent = dado
      option.setAttribute('onclick', 'pickName()')
      // option.setAttribute('data-bs-toggle', 'modal')
      // option.setAttribute('data-bs-target', '#contactModal')
      option.id = iD
      option.classList.add(classe)
      option.href = hRef

      return optionFather
    }
    for (var j = 0; j < novoArray.length; j++) {
      adicionaPacienteNaLista(novoArray[j])
    }
  }
})
xhr.send(), { once: true }

