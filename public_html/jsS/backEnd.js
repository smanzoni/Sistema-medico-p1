/* global medicos, pacientes, actuacionesClinicas, funcionalidadesMedico, funcionalidadesPaciente, historialDeMedicosUserLog */

var userLogueado;
var esMedico = false;
$("#btnLogin").click(evaluarDatosLogin);
$(".btn").click(mostrarSeccion);
$("#btnCerrarSesion").click(cerrarSesion);
$("#btnCambiarPw").click(cambiarPw);

pantallaLogin();

//Solo muestra el login.
function pantallaLogin() {
    $(".seccion").hide();
    $(".btn").hide();
    $(".medico").hide();
    $(".paciente").hide();
    $("#seccionLogin").show();
    $("#slcTipoUsuario").val("vacio");
    $("#pLogin").val("");
}

//Cerrar Sesion
function cerrarSesion() {
    var salir = confirm("Seguro deseas salir?");
    if (salir) {
        userLogueado = null;
        esMedico = false;
        $("#txtUser").val("");
        $("#txtPass").val("");
        pantallaLogin();
        $("#nombreUserLog").hide();
    }
}

//Logica que evalua el ingreso de datos del login.
function evaluarDatosLogin()
{
    var user = Number($("#txtUser").val());
    var pass = $("#txtPass").val();
    var tipoUsuario = $("#slcTipoUsuario").val();
// Boleanos para verificar ingreso de datos y poder tirar errores mas comodamente.
    var userValido = false;
    var contraValida = false;
    var esMedico = false;
//Verificacion para medicos.
    if (tipoUsuario === "medico") {
        for (var i = 0; i < medicos.length; i++) {
            if (medicos[i].numero === user && medicos[i].clave === pass) {
                userValido = true;
                contraValida = true;
                userLogueado = medicos[i];
                esMedico = true;
                break;
            } else if (medicos[i].numero === user && medicos[i].clave !== pass) {
                userValido = true;
                contraValida = false;
                break;
            }
        }
        // Evaluacion de los bool
        if (userValido && contraValida) {
            ocultarBotones("paciente");
            mostrarBotones("medico");
            mostrarSeccion();
            nombreUserLogueado(esMedico);
        } else if (userValido && !contraValida) {
            $("#pLogin").html("<h3>Contraseña incorrecta.</h3>");
        } else if (!userValido) {
            $("#pLogin").html("<h3>Usuario inexistente.</h3>");
        }
    }
    //Verificacion para pacientes.
    else if (tipoUsuario === "paciente") {
        for (var i = 0; i < pacientes.length; i++) {
            if (pacientes[i].documento === user && pacientes[i].clave === pass) {
                userValido = true;
                contraValida = true;
                //guarda el paciente logueado
                userLogueado = pacientes[i];
                //ya de entrada guarda el medico de cabecera actual
                var medicoCabeceraActual = userLogueado.medicocabecera;
                historialDeMedicosUserLog.push(medicoCabeceraActual);
                break;
            } else if (pacientes[i].documento === user && pacientes[i].clave !== pass) {
                userValido = true;
                contraValida = false;
                break;
            }
        }
        // Evaluacion de los bool
        if (userValido && contraValida) {
            ocultarBotones("medico");
            mostrarBotones("paciente");
            mostrarSeccion();
            nombreUserLogueado(esMedico);
        } else if (userValido && !contraValida) {
            $("#pLogin").html("<h3>Contraseña incorrecta.</h3>");
        } else if (!userValido) {
            $("#pLogin").html("<h3>Usuario inexistente.</h3>");
        }
    }
    // Error de tipo de usuario.
    else {
        $("#pLogin").html("<h3>Selecciona un tipo de usuario.</h3>");
    }
}

//Muestra la funcionalidad que clickee el usuario.
function mostrarSeccion() {
    $(".seccion").hide();
    $("#nombreUserLog").show();
    var _idBtnPresionado = $(this).attr("id");

    if (_idBtnPresionado === undefined) {
        $(".seccion").hide();
        $("#seccionIndex").show();
    } else {
        var _idSeccion = "s" + _idBtnPresionado.substr(4);
        $("#" + _idSeccion).show();
        switch (_idSeccion) {
            case "seccionMisHistoriasClinicasMedico":
                misHistoriasClinicas();
                break;
            case "seccionExtraerFoto":
                mostrarFotos();
                break;
            case "seccionMiHC":
                guardarMiHCpaciente();
                break;
            case "seccionCambiarMedico":
                desplegarMedicos();
                break;
            case "seccionMedicosConsultados":
                historialMedicosConsultados();
                break;
        }
    }
}

//Funcion para dejar en pantalla el nombre del usuario logueado. 
function nombreUserLogueado(_comprobarSiEsmedico) {
    if (_comprobarSiEsmedico) {
        $("#txtNombreUserLog").html("<u>Usuario actual:</u> Medico/a <i>" + userLogueado.nombre + "</i>");
    } else {
        $("#txtNombreUserLog").html("<u>Usuario actual:</u> Sr/a paciente <i>" + userLogueado.nombre + "</i>");
    }
}

//Cambiar contraseña.
function cambiarPw() {
    var _pwActual = $("#txtContraActual").val();
    var _pwNueva = $("#txtContraNueva").val();
    var _pwNuevaConfirm = $("#txtContraNuevaConfirm").val();

    if (_pwActual === userLogueado.clave) {
        if (_pwNueva === "" || _pwNuevaConfirm === "") {
            $("#pErroresCambiarPw").html("Ninguno de los campos puede quedar vacio.");
            _pwActual = $("#txtContraActual").val("");
            _pwNueva = $("#txtContraNueva").val("");
            _pwNuevaConfirm = $("#txtContraNuevaConfirm").val("");
        } else {
            if (_pwNueva === _pwNuevaConfirm) {
                userLogueado.clave = _pwNueva;
                var confirmar = confirm("¿Seguro deseas cambiar tu PassWord?");
                if (confirmar) {
                    if (esMedico) {
                        for (var i = 0; i < medicos; i++) {
                            if (userLogueado.numero === medicos[i].numero) {
                                medicos[i].clave = _pwNueva;
                                break;
                            }
                        }
                    } else {
                        for (var i = 0; i < pacientes; i++) {
                            if (userLogueado.documento === pacientes[i].documento) {
                                pacientes[i].clave = _pwNueva;
                                break;
                            }
                        }
                    }
                    $("#pErroresCambiarPw").html("Contraseña cambiada con éxito.");
                    _pwActual = $("#txtContraActual").val("");
                    _pwNueva = $("#txtContraNueva").val("");
                    _pwNuevaConfirm = $("#txtContraNuevaConfirm").val("");
                } else {
                    $("#pErroresCambiarPw").html("ERROR. Cerebro 404 not found.");
                    _pwActual = $("#txtContraActual").val("");
                    _pwNueva = $("#txtContraNueva").val("");
                    _pwNuevaConfirm = $("#txtContraNuevaConfirm").val("");
                }
            } else {
                $("#pErroresCambiarPw").html("Error en la confirmación de la nueva contraseña.");
                _pwActual = $("#txtContraActual").val("");
                _pwNueva = $("#txtContraNueva").val("");
                _pwNuevaConfirm = $("#txtContraNuevaConfirm").val("");
            }
        }
    } else {
        $("#pErroresCambiarPw").html("Error, la contraseña actual no coincide.");
        _pwActual = $("#txtContraActual").val("");
        _pwNueva = $("#txtContraNueva").val("");
        _pwNuevaConfirm = $("#txtContraNuevaConfirm").val("");
    }

}

//Funciones para ocultar y mostrar secciones.
function ocultarBotones(_usuario) {
    $(".btn").hide();
}

function mostrarBotones(_usuario) {
    $("." + _usuario).show();
}