
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        if(sessionStorage['id']){
          var id = sessionStorage['id']
        }
        let url = this.urlBase + "/all/" + id;
        $.get(url,(response) => {
            this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id
        $.post('/events/delete/'+eventId, {id: eventId}, (response) => {
            alert(response)
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = ' ',
            start_hour = ' ',
            end_hour = ' ';
            if(sessionStorage['id']){
              var id = sessionStorage['id']
            }

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
                if(sessionStorage['id']){
                  var id = sessionStorage['id']
                }
            }

            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end,
                    id: id
                }
                $.post(url, ev, (response) => {
                    alert(response)
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    actualizarEvento(evento){
          let start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
              end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
              editEvento = {
                id: evento.id,
                fechaInicio: start.substr(0,10),
                fechaFin: end.substr(0,10)
              }
          $.post(this.urlBase + '/update', editEvento, (response) => {
            if(response.exito == true){
              alert('El Evento ha sido editado.')
            }else{
              alert('El Evento no fue editado. Intente nuevamente')
            }
          })
        }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2016-11-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
              this.actualizarEvento(event);
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/delete.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event.id);
                    }
                }
            })
        }
    }

    const Manager = new EventManager()
