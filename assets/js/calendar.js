window.addEventListener('load', function () {
  console.log('Searching appointments...')
  var xhr = new XMLHttpRequest()

  xhr.open('GET', 'https://cm42-medical-dashboard.herokuapp.com/appointments')

  xhr.addEventListener('load', function () {
    if (xhr.status == 200) {
      var response = xhr.responseText
      var list = JSON.parse(response)
      // Extracted Data from json-server
      console.log(list)
      // Extracted Data from json-server
      // Filtering the Data, putting only 4 elements(startTime, status,patiendId and type)
      appCalendarSort = list.map(v => ({
        startTime: v.startTime,
        endTime: v.endTime,
        patientId: v.patientId,
        description: v.description
      }))
      // Filtering the Data, putting only 4 elements(startTime, status,patiendId and type)
      // Sorting the Data by the startTime
      sortBy(appCalendarSort, { prop: 'startTime' })
      JSON.stringify(appCalendarSort)
      console.log(appCalendarSort)
      console.log(appoSortId)
      // Sorting the Data by the startTime
      //taking the names by the other Json-Server and replacing them with your id
      arrayNameId2 = []
      for (i = 0; i < appCalendarSort.length; i++) {
        arrayNameId2.push(findById(appoSortId, appCalendarSort[i].patientId))
      }
      console.log(arrayNameId2)

      for (i = 0; i < appCalendarSort.length; i++) {
        appCalendarSort[i].patientId = arrayNameId2[i]
      }
      //taking the names by the other Json-Server and replacing them with your id
      console.log(appCalendarSort)
      appCalendarSort2 = appCalendarSort.map(a => ({
        start: a.startTime,
        end: a.endTime,
        title: `[${a.patientId}]'\n'${a.description}`
      }))
      JSON.stringify(appCalendarSort2)
      console.log(appCalendarSort2)
      draw(appCalendarSort2)
    }
  })
  xhr.send(), { once: true }
})

function draw(data) {
  var calendarEl = document.getElementById('calendar')
  var calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'bootstrap5',
    slotMinTime: '06:00',
    slotMaxTime: '20:00',
    aspectRatio: 0.3,
    expandRows: true,
    initialView: 'timeGridWeek',
    initialDate: new Date(),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: data
    // eventClick: function (info) {
    //   alert('Event: ' + info.event.title)
    //   // change the border color just for fun
    //   info.el.style.borderColor = 'red'
    // }
  })
  calendar.render()
}
