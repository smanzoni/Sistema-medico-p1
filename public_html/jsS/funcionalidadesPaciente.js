/* global medicos, pacientes, actuacionesClinicas, userLogueado */

var miHCuserLog = [];// array que almacena la historia clinica del paciente seleccionado
var historialDeMedicosUserLog = []; // array para dejar registro del historial de medicos

//Evento click
$("#btnCambiarMedico").click(cambiarMedico);

//criterio para ordenar por numero de medico
function criterioMedico(_a, _b)
{
    var _dev;
    if (_a.medico > _b.medico)
    {
        _dev = -1;
    } else {
        _dev = 1;
    }
    return _dev;
}

//criterio para ordenar por fecha
function criterioFecha(_a, _b)
{
    var _dev;
    if (_a.fecha > _b.fecha)
    {
        _dev = -1;
    } else {
        _dev = 1;
    }
    return _dev;
}

//Funcion para dejar guardada la historia clinica del paciente en una variable global
function guardarMiHCpaciente() {
    miHCuserLog = []; // vaciamos el array por si habia quedado precargado con logueos anteriores

    $("#pMiHCpaciente").empty();
    for (var i = 0; i < actuacionesClinicas.length; i++) {
        if (userLogueado.documento === actuacionesClinicas[i].paciente) {
            miHCuserLog.push(actuacionesClinicas[i]);
        }
    }
}

//Ordena las historias clinicas segun el onchange del select del HTML
function ordenarHCuserLog() {
    var opcionUsuario = $("#slcHcOrdenarPor").val();

    var arrayOrdenado = [];

    if (opcionUsuario === "fecha") {
        arrayOrdenado = miHCuserLog.sort(criterioFecha);
    } else if (opcionUsuario === "medico") {
        arrayOrdenado = miHCuserLog.sort(criterioMedico);
    }

    $("#pMiHCpaciente").empty();

    var contador = 0;
    for (var i = 0; i < arrayOrdenado.length; i++) {
        var nombreMedico = "";
        //Genera el nombre del medico por tabla.
        for (var j = 0; j < medicos.length; j++) {
            if (medicos[j].numero === arrayOrdenado[i].medico) {
                nombreMedico = medicos[j].nombre;
            }
        }
        $("#pMiHCpaciente").append("<table border='1'><tbody>\n\
                                      <tr><td><b>Numero de actuación</b></td> <td>" + arrayOrdenado[i].nroActuacion + "</td></tr>\n\
                                      <tr><td><b>Médico</b></td> <td>" + nombreMedico + " (Nro. Medico: " + arrayOrdenado[i].medico + ")</td></tr>\n\
                                      <tr><td><b>Fecha</b></td> <td>" + FechaATexto(arrayOrdenado[i].fecha) + "</td></tr>\n\
                                      <tr><td><b>Motivo</b></td> <td>" + arrayOrdenado[i].motivo + "</td></tr>\n\
                                      <tr><td><b>Diagnóstico</b></td> <td>" + arrayOrdenado[i].diagnostico + "</td></tr>\n\
                                      <tr><td><b>Prescripción</b></td> <td>" + arrayOrdenado[i].prescripcion + "</td></tr>\n\
                                      </tbody></table><br><br>");
        contador++;
    }
    if (contador === 0) {
        $("#pMiHCpaciente").html("<h3>No tienes generada historia clínica aun</h3>");
    }
}

//Arma el select de "Cambiar Medico de Cabecera" y muestra el nombre del medico de cabecera actual
function desplegarMedicos() {
    $("#pCambiarMedico").empty();
    var medicoCabeceraActual = userLogueado.medicocabecera; //
    historialDeMedicosUserLog.push(medicoCabeceraActual);

    var nombreMedico;
    for (var k = 0; k < medicos.length; k++) {
        if (medicoCabeceraActual === medicos[k].numero) {
            nombreMedico = medicos[k].nombre;
            break;
        }
    }
    $("#txtMedicoActual").append("Su Médico de cabecera actual es: " + nombreMedico);

    var contador = 0;
    for (var i = 0; i < medicos.length; i++) {
        if (medicos[i].especialidad === "Medicina General") {
            $("#slcMedicosDisponibles").append("<option value=" + medicos[i].numero + ">" + medicos[i].nombre + "</option>");
            contador++;
        }
    }
    if (contador === 0) {
        $("#slcMedicosDisponibles").empty();
        $("#pCambiarMedico").html("No hay medicos disponibles.");
        contador = 0;
    } else if (contador === 1) {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].especialidad === "Medicina General" && medicos[i].numero === medicoCabeceraActual) {
                $("#pCambiarMedico").html("No puedes cambiar de médico ya que el unico disponible es tu médico de cabecera actual.");
            }
        }
    }
}

//Funcion para cambiar de medico.
function cambiarMedico() {
    //Toma el medico de cabecera actual
    var medicoCabeceraActual = userLogueado.medicocabecera;
    //Toma el medico seleccionado en el <select>
    var medicoSeleccionado = Number($("#slcMedicosDisponibles").val());

    if (medicoSeleccionado === -1) {
        $("#pCambiarMedico").html("<h3>No has seleccionado un medico.</h3>");
    } else if (medicoSeleccionado === medicoCabeceraActual) {
        $("#pCambiarMedico").html("<h3>El medico seleccionado ya es tu medico actualmente.</h3>");
    } else {
        //bucle para buscar el nombre del medico seleccionado y mostrarlo en la pantalla de confirm.
        var nombreMedicoSelec;
        for (var h = 0; h < medicos.length; h++) {
            if (medicos[h].numero === medicoSeleccionado) {
                nombreMedicoSelec = medicos[h].nombre;
                break;
            }
        }
        // Confirmacion booleana
        var confirmacion = confirm("Seguro deseas cambiar tu medico de cabecera actual por " + nombreMedicoSelec + " ?");
        // Si acepta, se agrega el medico selec. al historial de medicos consultados.
        if (confirmacion) {
            historialDeMedicosUserLog.push(medicoSeleccionado);
            userLogueado.medicocabecera = medicoSeleccionado;
            alert("Usted ha cambiado su medico de cabecera actual con exito.");
            $("#txtMedicoActual").empty();
            $("#txtMedicoActual").append("Su Médico de cabecera actual es: " + nombreMedicoSelec);
            $("#pCambiarMedico").html("<h3>Has cambiado tu medico de cabecera con exito.</3>");
        }
    }

}

//Funcion que arma tabla con los medicos consultados.
function historialMedicosConsultados() {
    $("#pHistorialMedicos").empty();


    //Llenamos el array de historial de medicos consultados con todos los medicos de cualquier especialidad
    //con los que se haya atendido el paciente.
    for (var y = 0; y < actuacionesClinicas.length; y++) {
        if (actuacionesClinicas[y].paciente === userLogueado.documento) {
            historialDeMedicosUserLog.push(actuacionesClinicas[y].medico);
        }
    }

    //dejamos el array sin duplicados.
    for (var i = 0; i < historialDeMedicosUserLog.length; i++) {
        for (var j = (i + 1); j < historialDeMedicosUserLog.length; j++) {
            if (historialDeMedicosUserLog[i] === historialDeMedicosUserLog[j]) {
                historialDeMedicosUserLog.splice(j, 1);
                j--;
            }
        }
    }

    //Imprimimos los datos de los medicos.
    for (var h = 0; h < historialDeMedicosUserLog.length; h++) {
        for (var k = 0; k < medicos.length; k++) {
            if (historialDeMedicosUserLog[h] === medicos[k].numero) {
                $("#pHistorialMedicos").append("<table border='1'><tbody><tr><td><b>Nombre</b></td><td>" + medicos[k].nombre + "</td></tr>\n\
                                      <tr><td><b>Numero</b></td><td>" + medicos[k].numero + "</td>\n\
                                      <tr><td><b>Especialidad</b></td><td>" + medicos[k].especialidad + "</td></tbody></table><br><br>");
            }
        }
    }
}

//Funcion para mostrar fotos asociadas al paciente, con su respectivo diagnostico y prescripcion.
function mostrarFotos() {
    $("#pSubFoto").empty();
    $("#pSubFoto").append("<hr><br><br>");

    var contador = 0;
    var contadorDeActuaciones = 0;
    for (var i = 0; i < actuacionesClinicas.length; i++) {
        //si en el bucle, la propiedad "imagen" del paciente es distinta a vacio (""), se imprime la tabla con la imagen correspondiente.
        if (actuacionesClinicas[i].paciente === userLogueado.documento && actuacionesClinicas[i].imagen !== "") {
            if (actuacionesClinicas[i].paciente !== userLogueado.documento) {
                contadorDeActuaciones++;
            }
            $("#pSubFoto").append("<table border='1'>\n\
                                   <tr><td><b>Imagen</b></td><td><img src='../imgS/" + actuacionesClinicas[i].imagen + "'></td></tr>\n\
                                   <tr><td><b>Fecha</b></td><td>" + FechaATexto(actuacionesClinicas[i].fecha) + "</td></tr>\n\
                                   <tr><td><b>Diagnostico</b></td><td>" + actuacionesClinicas[i].diagnostico + "</td></tr>\n\
                                   <tr><td><b>Prescripcion</b></td><td>" + actuacionesClinicas[i].prescripcion + "</td></tr></table><br><br><hr><br><br>");
            contador++;
        }
    }
    if (contador === 0) {
        $("#pSubFoto").html("<h3>No posees imagenes disponibles.</h3>");
    } else if (contadorDeActuaciones === actuacionesClinicas.length) {
        $("#pSubFoto").html("<h3>No posees actuaciones disponibles.</h3>");
    }
}