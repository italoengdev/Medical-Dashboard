var c = document.querySelector('button', '#dropdown')

c.addEventListener('click', function () {
  console.log('Searching appointments...')
  var xhr = new XMLHttpRequest()

  xhr.open('GET', 'https://cm42-medical-dashboard.herokuapp.com/appointments')

  xhr.addEventListener('load', function () {
    if (xhr.status == 200) {
      var response = xhr.responseText
      var appointments = JSON.parse(response)
      console.log(appointments)

      appoSort = appointments.map(v => ({
        startTime: v.startTime + v.endTime,
        status: v.status,
        patientId: v.patientId,
        type: v.type
      }))

      sortBy(appoSort, { prop: 'startTime' })
      JSON.stringify(appoSort)
      console.log(appoSort)
      console.log(appoSortId)

      arrayNameId = []
      for (i = 0; i < appoSort.length; i++) {
        arrayNameId.push(findById(appoSortId, appoSort[i].patientId))
      }
      console.log(arrayNameId)

      for (i = 0; i < appoSort.length; i++) {
        appoSort[i].patientId = arrayNameId[i]
      }

      console.log(appoSort)
      //console.log(findById(appoSortId, appoSort[5].patientId))

      function montaTr(paciente) {
        var pacienteTr = document.createElement('tr')
        pacienteTr.classList.add('paciente')
        pacienteTr.appendChild(
          montaTd(
            paciente.startTime.substr(8, 2) +
              '/' +
              paciente.startTime.substr(5, 2) +
              '/' +
              paciente.startTime.substr(0, 4) +
              ' ' +
              paciente.startTime.substr(11, 5) +
              ' ' +
              paciente.startTime.substr(35, 5),
            'info-start'
          )
        )
        pacienteTr.appendChild(montaTd(paciente.status, 'info-status'))
        pacienteTr.appendChild(montaTd(paciente.patientId, 'info-id'))
        pacienteTr.appendChild(montaTd(paciente.type, 'info-type'))

        return pacienteTr
      }

      function adicionaPacienteNaLista(paciente) {
        var pacienteTr = montaTr(paciente)
        var tdDateYear = document.querySelector('#table-pacients')
        tdDateYear.appendChild(pacienteTr)
      }

      function montaTd(dado, classe) {
        var tdDate = document.createElement('td')
        tdDate.textContent = dado
        tdDate.classList.add(classe)

        return tdDate
      }
      /*appoSort.forEach(function (paciente) {
        adicionaPacienteNaLista(paciente)
      })*/
      appoSort.forEach(function (paciente) {
        adicionaPacienteNaLista(paciente)
      })
    }
  })
  xhr.send()
})

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

// function find by ID

function findById(source, id) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].id === id) {
      return source[i].name
    }
  }
  throw "Couldn't find object with id: " + id
}
