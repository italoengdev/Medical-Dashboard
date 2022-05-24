document.addEventListener(
  'click',
  function (event) {
    event = event || window.event
    var target = event.target || event.srcElement
    let patientName = target.textContent
    console.log(patientName)
    document.getElementsByClassName('form-label').textContent =
      patientName.textContent
  },
  false
)
