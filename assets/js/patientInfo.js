console.log('Searching pacients...')
//b.setAttribute('disabled', 'disabled')

var abc = new XMLHttpRequest()
var edf = new XMLHttpRequest()

abc.open('GET', 'https://cm42-medical-dashboard.herokuapp.com/patients')
edf.open('GET', 'https://cm42-medical-dashboard.herokuapp.com/appointments')

abc.addEventListener('load', function () {
  if (abc.status == 200) {
    var response = abc.responseText
    var pacients = JSON.parse(response)
    console.log(pacients)
    objectSelectedByName = findByName(pacients, data)
    sessionStorage.setItem('id', objectSelectedByName.id)
    console.log(objectSelectedByName)
    // Patient Info
    document.getElementById('pickCpf').textContent = validaCpf(
      objectSelectedByName.document
    )
    document.getElementById('pickAge').textContent =
      calcAge(objectSelectedByName.birthday) + 'y/o'
    // Patient Info
    // Plan Information
    document.getElementById('pickHealthPlan').textContent =
      objectSelectedByName.insurancePlan

    document.getElementById('pickPlanId').textContent =
      objectSelectedByName.healthSystemId
  }
})
abc.send(), { once: true }
// Saving local id to relate with other array
data1 = sessionStorage.getItem('id')

console.log(data1)

edf.addEventListener('load', function () {
  if (edf.status == 200) {
    var response = edf.responseText

    var appointments2 = JSON.parse(response)
    // Extracted Data from json-server
    console.log(appointments2)
    // Extracted Data from json-server

    selectedAttById = findAppointmentAtt(appointments2)

    sortBy(selectedAttById, { prop: 'startTime' })
    console.log(selectedAttById)

    lastSelectedAttById = selectedAttById[selectedAttById.length - 1]

    document.getElementById('pickTypeDoc').textContent =
      lastSelectedAttById.specialty

    arrangeDate =
      lastSelectedAttById.startTime.substr(8, 2) +
      '/' +
      lastSelectedAttById.startTime.substr(5, 2) +
      '/' +
      lastSelectedAttById.startTime.substr(0, 4)

    document.getElementById('pickDateApp').textContent = arrangeDate

    document.getElementById('pickDateApp2').textContent = arrangeDate

    document.getElementById('pickTypeDoc2').textContent =
      lastSelectedAttById.specialty + ' ' + 'says:'

    document.getElementById('pickAppDescription').textContent =
      lastSelectedAttById.description

    //taking the names by the other Json-Server and replacing them with your id
  }
})
edf.send(), { once: true }

function findByName(source, name) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].name === name) {
      return source[i]
    }
  }
  throw "Couldn't find object with id: " + name
}

function calcAge(dateString) {
  var birthday = +new Date(dateString)
  return ~~((Date.now() - birthday) / 31557600000)
}

function validaCpf(cpf) {
  var ao_cpf = cpf
  var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/
  if (cpfValido.test(ao_cpf) == false) {
    // alert('invalido')
    var formattedCpf = ao_cpf
      .toString()
      .replace(/^(\d{3})\D*(\d{3})\D*(\d{3})\D*(\d{2})$/g, '$1.$2.$3-$4')
    var valorValido = formattedCpf
    return valorValido
  }
}

function findAppointmentAtt(people) {
  return people
    .filter(function (p) {
      return p.patientId === parseInt(data1)
    })
    .map(function (p) {
      return p
    })
}

// SORTBY FUNCTION
var sortBy = (function () {
  var toString = Object.prototype.toString,
    // default parser function
    parse = function (x) {
      return x
    },
    // gets the item to be sorted
    getItem = function (x) {
      var isObject = x != null && typeof x === 'object'
      var isProp = isObject && this.prop in x
      return this.parser(isProp ? x[this.prop] : x)
    }

  /**
   * Sorts an array of elements.
   *
   * @param  {Array} array: the collection to sort
   * @param  {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby(array, cfg) {
    if (!(array instanceof Array && array.length)) return []
    if (toString.call(cfg) !== '[object Object]') cfg = {}
    if (typeof cfg.parser !== 'function') cfg.parser = parse
    cfg.desc = !!cfg.desc ? -1 : 1
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a)
      b = getItem.call(cfg, b)
      return cfg.desc * (a < b ? -1 : +(a > b))
    })
  }
})()

// Kind of SORT type - not used
//dateArray = Array.from(appointments, ({ startTime }) => startTime)
//console.log(dateArray.sort())

function sortByDate(arr) {
  arr.sort(function (a, b) {
    return Number(new Date(a.readableDate)) - Number(new Date(b.readableDate))
  })

  return arr
}
