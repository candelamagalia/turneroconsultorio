let turnos = [];


function agregarPaciente(pnombre, pedad, pemail, pfecha, phora) {
    let nuevoPaciente = {
        nombre: pnombre,
        edad: pedad,
        email: pemail,
        fecha: pfecha,
        hora: phora,
    };
    console.log(nuevoPaciente);
    turnos.push(nuevoPaciente);
    localStorageTurnos(turnos);
}

function obtenerTurnos() {
    var turnosGuardados = localStorage.getItem('localTurnos');
    turnosGuardados == null ? turnos = [] : turnos = JSON.parse(turnosGuardados);
    return turnos;
}

function localStorageTurnos(plista) {
    localStorage.setItem('localTurnos', JSON.stringify(plista));
    if (plista.length >= 5) {
        fieldset.disabled = true;
        Swal.fire("No hay más turnos disponibles");
    } else {
        Swal.fire("Hay turnos disponibles");
    }
}