let enviar = document.getElementById("enviar");
if (enviar) {
    enviar.addEventListener("click", guardarPaciente);
}
tablaTurnos();
validacionFecha();

function validacionFecha() {
    let calendario = document.getElementById('calendarioFecha');
    let reloj = document.getElementById('calendarioHora');

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    calendario.setAttribute("min", today);
}


function principal() {
    //inicializar variables
    let enviar = document.getElementById("enviar");
    if (enviar) {
        enviar.addEventListener("click", guardarPaciente);
    }

    //carga de variables
}

async function guardarPaciente() {
    let sNombre = document.getElementById("nombre").value,
        sEdad = document.getElementById("edad").value,
        sEmail = document.getElementById("email").value,
        sFecha = document.getElementById("calendarioFecha").value,
        sHora = document.getElementById("calendarioHora").value;

    let mensajeAlert = "<ul>Falta ingresar datos de:";
    if (!sNombre) mensajeAlert += "<li>nombre</li>";
    if (!sEdad) mensajeAlert += "<li>edad</li>";
    if (!sEmail) mensajeAlert += "<li>email</li>";
    if (!sFecha && result) mensajeAlert += "<li>fecha</li>";
    if (!sHora) mensajeAlert += "<li>hora</li>";
    mensajeAlert += "</ul>";

    const horaSelec = sHora.split(":");
    const horaNumero = parseInt(horaSelec[0]);

    const diaSemana = diaDeLaSemana();

    if (diaSemana == "Sabado" || diaSemana == "Domingo") {
        await Swal.fire('Día no disponible');
        return;
    }

    if (horaNumero > 18 || horaNumero < 15) {
        await Swal.fire('Rango horario no disponible');
        return;
    }

    if (sNombre && sEdad && sEdad && sFecha && sHora) {
        await Swal.fire(
            "Datos ingresados correctamente",
            `Datos del paciente: <li>${sNombre}</li><li> ${sEdad} años </li><li>${sEmail}</li>
            <li>${sFecha}</li><li>${sHora}</li>`,
            "success"
        );
        cleanCombos();
        agregarPaciente(sNombre, sEdad, sEmail, sFecha, sHora);
        tablaTurnos();
    } else {
        await Swal.fire("Datos requeridos", mensajeAlert, "warning");
    }
}

function diaDeLaSemana() {
    var diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var d = document.getElementById('calendarioFecha').valueAsDate;
    var n = d.getUTCDay()
    const dia = diasSemana[n];
    return dia;
}

function cleanCombos() {
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("email").value = "";
    document.getElementById("calendarioFecha").value = "";
    document.getElementById("calendarioHora").value = "";
    document.getElementById("nombre").focus();
}

function tablaTurnos() {
    let list = obtenerTurnos();
    console.log(list)
    tbody = document.querySelector('#tablaTurnos tbody');

    if (tbody) {
        tbody.innerHTML = '';

        for (var i = 0; i < list.length; i++) {
            var row = tbody.insertRow(i),
                nombreCelda = row.insertCell(0),
                edadCelda = row.insertCell(1),
                emailCelda = row.insertCell(2),
                fechaCelda = row.insertCell(3),
                horaCelda = row.insertCell(4);



            nombreCelda.innerHTML = list[i].nombre;
            edadCelda.innerHTML = list[i].edad;
            emailCelda.innerHTML = list[i].email;
            fechaCelda.innerHTML = list[i].fecha;
            horaCelda.innerHTML = list[i].hora;

            tbody.appendChild(row);
        }
    }

}