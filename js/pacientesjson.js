document.getElementById('mostrar').addEventListener('click', cargarJSON);

function cargarJSON() {
    fetch('../pacientes.json')
        .then(function(res) {
            return res.json();

        })
        .then(function(data) {
            let html = '';
            data.forEach(function(paciente) {
                html += `
                <table>
                <tr>
                    <td>${paciente.nombre}</td>
                    
                    <td> ${paciente.edad}</td>
                    
                    <td>${paciente.email}</td>
                    
                    <td>${paciente.fecha}</td>
                    
                    <td> ${paciente.hora}</td>
                </tr>

    
            </table>                
                `;

            })
            document.getElementById('tablaJSON').innerHTML = html;

        })
}