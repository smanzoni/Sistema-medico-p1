/* global medicos, pacientes, actuacionesClinicas, userLogueado */

//Eventos click.
$("#btnDesbloquearAct").click(filtroAgregar);
$("#btnAgregarConsulta").click(agregarNuevaActuacion);
$("#btnBuscarPaciente").click(llenarSlcBuscarHC);
$("#btnBuscarHCpaciente").click(desplegarHC);
$("#btnMostrarEspecialidad").click(filtrarEspecialidades);

//creacion de variable global date
var fechaHoy = new Date();
//funcion para crear la fecha de hoy. apoyandose en la variable de arriba.
function crearFechaDeHoy() {
    var dd = fechaHoy.getDate();//dia
    var mm = (fechaHoy.getMonth() + 1); //mes +1 por la base 0.
    var yyyy = fechaHoy.getFullYear();//año
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    var fecha = dd + "/" + mm + "/" + yyyy;
    return fecha;
}

//Funcion que "depura" la fecha, para convertirla a un string con formato comodo.
function FechaATexto(fecha) {
    var dd = fecha.getDate();
    var mm = fecha.getMonth() + 1; //hoy es 0!
    var yyyy = fecha.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    var fechaTexto = dd + "/" + mm + "/" + yyyy;
    return fechaTexto;
}

//si los campos del slc de nuevaActuacion quedan sin completar los bloquea.
function filtroAgregar() {
    //Coloca la fecha en el campo fecha de la nueva actuacion clinica, este esta bloqueado, por lo que hace imposible la colocacion erronea de la misma.
    var fechaHoy = crearFechaDeHoy();
    $("#txtFechaActuacion").val(fechaHoy);


    var eleccionTipoPaciente = $("#slcEleccionBusquedaPaciente").val();//Evalua la seleccion del usuario, tipo de busqueda : Nombre o CI
    var documentoPaciente = Number($("#slcPaciente").val()); // como los value del select son las ci de pacientes, se toma la misma a una variable
    //Arma las listas de SLC / Nombre
    if (eleccionTipoPaciente === "nombre") {
        $("#slcPaciente").empty();
        $("#slcPaciente").append("<option value='-1'>Selecciona</option>");
        for (var i = 0; i < pacientes.length; i++) {
            $("#slcPaciente").append("<option value='" + pacientes[i].documento + "'>" + pacientes[i].nombre + "</option>");
        }
        //Arma el SLC / Cedula
    } else if (eleccionTipoPaciente === "ci") {
        $("#slcPaciente").empty();
        $("#slcPaciente").append("<option value='-1'>Selecciona </option>");
        for (var i = 0; i < pacientes.length; i++) {
            $("#slcPaciente").append("<option value='" + pacientes[i].documento + "'>" + pacientes[i].documento + "</option>");
        }
    }
    //Error por si deja el campo de select vacio.
    if (documentoPaciente === -1) {
        $("#txtErrorSeleccionaPaciente").html("Haz tu seleccion de paciente.");
    }
}

//Hace evaluacion del select, si este tiene value -1( osea, que el usuario no selecciono nada ), mantiene todos los campos de ingreso bloqueados.
function evaluarSeleccionPaciente() {
    var idSelected = $("#slcPaciente").val();
    if (idSelected === "-1") {
        $("#txtMotivoConsulta").attr("disabled", "disabled");
        $("#txtDiagnosticoConsulta").attr("disabled", "disabled");
        $("#txtPrescripcionConsulta").attr("disabled", "disabled");
        $("#imgImagenConsulta").attr("disabled", "disabled");
        $("#btnAgregarConsulta").attr("disabled", "disabled");
    } else {
        $("#txtMotivoConsulta").removeAttr("disabled");
        $("#txtDiagnosticoConsulta").removeAttr("disabled");
        $("#txtPrescripcionConsulta").removeAttr("disabled");
        $("#imgImagenConsulta").removeAttr("disabled");
        $("#btnAgregarConsulta").removeAttr("disabled");
    }
}

//Funcion para evaluar si los parrafos escritos en la actuacion medica no estan vacios.
function textoVacio(_texto) {
    var _resultado = false;
    var _contador = 0;
    // Recorre el parrafo. Si el campo esta vacio el contador suma +1
    for (var i = 0; i < _texto.length; i++) {
        if (_texto.charAt(i) === " ") {
            _contador++;
        }
    }
    // Si el lenght del parrafo es = al contador, significa que todo el campo de texto esta vacio. 
    if (_contador === _texto.length) {
        _resultado = true;
    }

    return _resultado;
}

//Depurar ruta de imagen
function depurarRuta(_fotoX) {
    var _dev = _fotoX.substr(_fotoX.lastIndexOf("\\") + 1);
    return _dev;
}

//Agregar nueva actuacion.
function agregarNuevaActuacion() {

//Toma el numero mayor de actuaciones
    var nroAct = actuacionesClinicas[actuacionesClinicas.length - 1].nroActuacion;
    nroAct++;
//Reafirmamos el id x si las moscas. 
    var idPaciente = Number($("#slcPaciente").val());
//Tomamos el id del medico logueado
    var idMedico = userLogueado.numero;
    var motivoConsulta = $("#txtMotivoConsulta").val();
    var diagnosticoConsulta = $("#txtDiagnosticoConsulta").val();
    var prescripcionConsulta = $("#txtPrescripcionConsulta").val();
    var imagen = depurarRuta($("#imgImagenConsulta").val());
    if (textoVacio(motivoConsulta) || textoVacio(diagnosticoConsulta) || textoVacio(prescripcionConsulta)) {
        alert("Error.");
        $("#pErroresConsulta").html("Algun campo ha quedado sin completar, revisa tus ingresos.");
    } else {
//creamos el nuevo objeto de actuacion
        var nuevaActuacion = {
            nroActuacion: nroAct,
            paciente: idPaciente,
            medico: idMedico, //Medicina General
            fecha: fechaHoy,
            motivo: motivoConsulta,
            diagnostico: diagnosticoConsulta,
            prescripcion: prescripcionConsulta,
            imagen: imagen
        };
        // Vaciamos los campos para no generar confusion.
        $("#txtMotivoConsulta").val("");
        $("#txtDiagnosticoConsulta").val("");
        $("#txtPrescripcionConsulta").val("");
        $("#imgImagenConsulta").val("");
        // Alert que indica la operacion exitosa.
        alert("Actuación agregada con éxito!.");
        $("#pErroresConsulta").html("Actuación agregada con éxito!.");
        //lo agregamos al array de actuaciones.
        actuacionesClinicas.push(nuevaActuacion);
    }
}

//Mis historias clinicas, genera listado de historias clinicas relacionadas al medico logueado.
function misHistoriasClinicas() {
    $("#pMisHCmedico").empty();
    //Presenta al medico que consulta la funcion.
    $("#pMisHCmedico").append("<h3><i><u>Historias Clínicas de " + userLogueado.nombre + "</u></i></h3> \n\
                              <b>______________________________________________________________________________________________</b> <br>");

    var contador = 0;
    for (var i = 0; i < actuacionesClinicas.length; i++) {
        //Condicion para filtrar las actClinicas especificas al medico   
        if (userLogueado.numero === actuacionesClinicas[i].medico) {
            //2do bucle para generar el nombre del paciente especifico y mostrarlo en la tabla
            var nombrePaciente = "";
            for (var h = 0; h < pacientes.length; h++) {
                if (pacientes[h].documento === actuacionesClinicas[i].paciente) {
                    nombrePaciente = pacientes[h].nombre;
                    break;
                }
            }
            // Imprimimos las tablas
            $("#pMisHCmedico").append("<table border= '1' ><tbody>\
                                       <tr><td><b>Paciente:</b></td> <td>" + nombrePaciente + "(C.I.:" + actuacionesClinicas[i].paciente + ")</td><br> \n\
                                       <tr><td><b>Fecha del hecho:</b></td> <td>" + FechaATexto(actuacionesClinicas[i].fecha) + "</td><br> \n\
                                       <tr><td><b>Motivo:</b></td> <td>" + actuacionesClinicas[i].motivo + "</td><br> \n\
                                       <tr><td><b>Diagnostico:</b></td> <td>" + actuacionesClinicas[i].diagnostico + "</td><br> \n\
                                       <tr><td><b>Prescripción:</b></td> <td>" + actuacionesClinicas[i].prescripcion + "</td></tbody></table>");

        } else {
            contador++;
        }
    }


    if (contador === actuacionesClinicas.length) {
        $("#pMisHCmedico").html("<h3>No posees historias clinicas disponibles</h3>");
    }
}

//Filtrar especialidades
function filtrarEspecialidades() {
    $("#pAgendaMedicos").empty();
    var medicosFiltrados = []; //Array vacio para agrupar segun especialidades

    var opcionFiltrado = $("#slcEspecialidades").val();// Toma la opcion del select

    //Condicionales para filtrar por especialidades
    if (opcionFiltrado === "-1") {
        $("#pAgendaMedicos").html("<h3>Selecciona un filtro.</h3>");
    } else if (opcionFiltrado === "sinFiltro") {
        for (var i = 0; i < medicos.length; i++) {
            medicosFiltrados.push(medicos[i]);
        }
    } else if (opcionFiltrado === "medGral") {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].especialidad === "Medicina General") {
                medicosFiltrados.push(medicos[i]);
            }
        }
    } else if (opcionFiltrado === "radiologo") {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].especialidad === "Radiólogo") {
                medicosFiltrados.push(medicos[i]);
            }
        }
    } else if (opcionFiltrado === "oculista") {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].especialidad === "Oculista") {
                medicosFiltrados.push(medicos[i]);
            }
        }
    } else if (opcionFiltrado === "urologo") {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].especialidad === "Urólogo") {
                medicosFiltrados.push(medicos[i]);
            }
        }
    } else if (opcionFiltrado === "oftalmologia") {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].especialidad === "Oftalmología") {
                medicosFiltrados.push(medicos[i]);
            }
        }
    } else if (opcionFiltrado === "pediatria") {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].especialidad === "Pediatría") {
                medicosFiltrados.push(medicos[i]);
            }
        }
    } else if (opcionFiltrado === "neurologia") {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].especialidad === "Neurología") {
                medicosFiltrados.push(medicos[i]);
            }
        }

        if (medicosFiltrados.length === 0) {
            $("#pAgendaMedicos").html("No hay medicos disponibles para la especialidad seleccionada.");
        }
    }
    //Ordenamos el array alfabeticamente por nombre
    medicosFiltrados.sort(criterioMedicoNombre);
    //Listamos la seccion especifica
    for (var i = 0; i < medicosFiltrados.length; i++) {
        $("#pAgendaMedicos").append("<table border= '1' ><tbody>\
                                       <tr><td><b>Nombre:</b></td>  <td>  " + medicosFiltrados[i].nombre + "</td><br> \n\
                                       <tr><td><b>Número:</b></td> <td>  " + medicosFiltrados[i].numero + "</td><br> \n\
                                       <tr><td><b>Especialidad:</b></td> <td>  " + medicosFiltrados[i].especialidad + "</td></tbody></table><br>");
    }
}

//Criterio de orden para arrays por nombre
function criterioMedicoNombre(_a, _b)
{
    var _dev;
    if (_a.nombre > _b.nombre)
    {
        _dev = 1;
    } else {
        _dev = -1;
    }
    return _dev;
}

//llena de info el select de la seccion buscar historia clinica.
function llenarSlcBuscarHC() {
    var eleccionBusqueda = $("#slcBuscarPacientePor").val();
    // Genera el SLC con nombres
    if (eleccionBusqueda === "nombre") {
        $("#slcPacienteHC").empty();
        $("#slcPacienteHC").append("<option value='" + -1 + "'> Selecciona... </option>");
        for (var i = 0; i < pacientes.length; i++) {
            $("#slcPacienteHC").append("<option value='" + pacientes[i].documento + "'>" + pacientes[i].nombre + "</option>");
        }
        // Genera el SLC por Ci
    } else if (eleccionBusqueda === "ci") {
        $("#slcPacienteHC").empty();
        $("#slcPacienteHC").append("<option value='" + -1 + "'> Selecciona... </option>");
        for (var j = 0; j < pacientes.length; j++) {
            $("#slcPacienteHC").append("<option value='" + pacientes[j].documento + "'>" + pacientes[j].documento + "</option>");
        }
    }
}

//busca historia clinica especifica.
function desplegarHC() {
    var pacienteSeleccionado = Number($("#slcPacienteHC").val());

    if (pacienteSeleccionado === -1) {
        $("#seccionHCespecifica").append("<h3>No has seleccionado un paciente.</h3>");
    } else {
        $("#seccionHCespecifica").empty();

        //bucle para tomar el nombre del paciente.
        var nombrePaciente = "";
        for (var i = 0; i < pacientes.length; i++) {
            if (pacienteSeleccionado === pacientes[i].documento) {
                nombrePaciente = pacientes[i].nombre;
                break;
            }
        }
        $("#seccionHCespecifica").append("<h3>Historial de atenciones del paciente " + nombrePaciente + "</h3>");


        for (var k = 0; k < pacientes.length; k++) {
            if (pacienteSeleccionado === pacientes[k].documento) {
                //Bucle que recorre las actuaciones clinicas para hallar coincidencia entre el pacienteSeleccionado y el "paciente" de la act.
                for (var l = 0; l < actuacionesClinicas.length; l++) {
                    if (pacienteSeleccionado === actuacionesClinicas[l].paciente) {
                        //bucle para tomar el nombre del medico.
                        var nombremedico = "";
                        for (var n = 0; n < medicos.length; n++) {
                            if (actuacionesClinicas[l].medico === medicos[n].numero) {
                                nombremedico = medicos[n].nombre;
                                break;
                            }
                        }
                        //Generamos tablas.
                        $("#seccionHCespecifica").append("<table border='1'>\n\
                          <tr><td>Numero de actuacion</td><td>" + actuacionesClinicas[l].nroActuacion + "</td></tr> \n\
                          <tr><td>Medico</td><td>" + nombremedico + " (Nro.Medico: " + actuacionesClinicas[l].medico + " )</td></tr> \n\
                          <tr><td>Fecha</td><td>" + FechaATexto(actuacionesClinicas[l].fecha) + "</td></tr> \n\
                          <tr><td>Motivo</td><td>" + actuacionesClinicas[l].motivo + "</td></tr> \n\
                          <tr><td>Diagnostico</td><td>" + actuacionesClinicas[l].diagnostico + "</td></tr> \n\
                          <tr><td>Prescripción</td><td>" + actuacionesClinicas[l].prescripcion + "</td></tr> \n\
                          </table><br>");
                    }
                }
                break;
            }
        }
    }
}
