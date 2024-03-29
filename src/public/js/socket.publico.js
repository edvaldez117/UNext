var socket = io();
var tablaTickets = $('#tablaTickets');
var mensajeSinTickets = $('#mensajeSinTickets');
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');
var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('entrarEmpresa', function (resp) {
        console.log(resp.message);
    });
});

socket.on('estadoActual', function (data) {
    console.log(data);
    actualizaHTML(data);
});

socket.on('ultimos4', function (data) {
    console.log("data: ", data);
    actualizaHTML(data);
});

function actualizaHTML(data) {
    var ultimos4 = data.ultimos4;
    var ultimos4Escritorios = data.ultimos4Escritorios;
    if(ultimos4.length > 0 && tablaTickets.hasClass('d-none')) {
        tablaTickets.removeClass('d-none');
        mensajeSinTickets.addClass('d-none');
    }
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].clave);
        lblEscritorios[i].text('Escritorio ' + ultimos4Escritorios[i]);
    }
}