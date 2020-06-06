//________________________________________________________________
//________________________________________________________________

// Médicos
var medicos = [
    {numero: 11,
        nombre: "Stanley Turrentine",
        especialidad: "Medicina General",
        clave: "11"
    },
//________________________________________________________________
    {numero: 22,
        nombre: "Hank Mobley",
        especialidad: "Medicina General",
        clave: "22"
    },
//________________________________________________________________
    {numero: 33,
        nombre: "Janis Joplin",
        especialidad: "Radiólogo",
        clave: "asd"
    },
    //________________________________________________________________
    {numero: 44,
        nombre: "Jaco Pastorious",
        especialidad: "Radiólogo",
        clave: "asd"
    },
    //________________________________________________________________
    {numero: 55,
        nombre: "Eric Marienthal",
        especialidad: "Radiólogo",
        clave: "asd"
    },
//________________________________________________________________
    {numero: 66,
        nombre: "Big Mamma Thornton",
        especialidad: "Oculista",
        clave: "44"
    },
//________________________________________________________________
    {numero: 3222,
        nombre: "Sonny Boy Williamson",
        especialidad: "Oculista",
        clave: "asd"
    },
//________________________________________________________________
    {numero: 4443,
        nombre: "Howling Wolf",
        especialidad: "Oculista",
        clave: "123"
    },
//________________________________________________________________
    {numero: 3222,
        nombre: "San Espedito",
        especialidad: "Urólogo",
        clave: "ssee"
    },
    //________________________________________________________________
    {numero: 34,
        nombre: "Roman Riquelme",
        especialidad: "Urólogo",
        clave: "141"
    },
    //________________________________________________________________
    {numero: 33333,
        nombre: "Duke Ellingtong",
        especialidad: "Urólogo",
        clave: "34"
    },
    //________________________________________________________________
    {
        numero: 123456,
        nombre: "Erica Zanabria",
        especialidad: "Medicina General",
        clave: "erica"
    },
    //________________________________________________________________
    {
        numero: 654321,
        nombre: "Elisa Alvez",
        especialidad: "Medicina General",
        clave: "aaaaa"
    },
    //________________________________________________________________
    {
        numero: 111111,
        nombre: "Laura Tiscornia",
        especialidad: "Medicina General",
        clave: "eer32"
    },
    //________________________________________________________________
    {
        numero: 634322,
        nombre: "Ernesto Fabini",
        especialidad: "Oftalmología",
        clave: "eeff"
    },
    //________________________________________________________________
    {
        numero: 234432,
        nombre: "Laurita Mune",
        especialidad: "Oftalmología",
        clave: "llmm"
    },
    //________________________________________________________________
    {
        numero: 664422,
        nombre: "Jose Maria Perez",
        especialidad: "Oftalmología",
        clave: "aaabb"
    },
    //________________________________________________________________
    {
        numero: 245124,
        nombre: "Jorge Perez",
        especialidad: "Pediatría",
        clave: "jpere"
    },
    //________________________________________________________________
    {
        numero: 224455,
        nombre: "Juan Pedro Perez",
        especialidad: "Pediatría",
        clave: "qqqqq"
    },
    //________________________________________________________________
    {
        numero: 887548,
        nombre: "Tomas Albarracin",
        especialidad: "Neurología",
        clave: "dd"
    },
    //________________________________________________________________
    {
        numero: 887548,
        nombre: "Juana la Loca",
        especialidad: "Neurología",
        clave: "ssss"
    },
    //________________________________________________________________
    {
        numero: 887548,
        nombre: "Gengis Khan",
        especialidad: "Neurología",
        clave: "dd"
    }
];
//________________________________________________________________
//________________________________________________________________

//Pacientes
var pacientes = [
    {documento: 1,
        nombre: "Jose Rodriguez",
        medicocabecera: 22,
        clave: "1"
    },
//________________________________________________________________
    {documento: 2,
        nombre: "Ana Gonzalez",
        medicocabecera: 22,
        clave: "2"
    },
//________________________________________________________________
    {documento: 3,
        nombre: "Eduardo Perez",
        medicocabecera: 22,
        clave: "3"
    },
//________________________________________________________________
    {documento: 4,
        nombre: "Maria Pena",
        medicocabecera: 11,
        clave: "4"
    },
//________________________________________________________________
    {documento: 5,
        nombre: "Edgardo Montielli",
        medicocabecera: 11,
        clave: "5"
    },
//________________________________________________________________
    {documento: 6,
        nombre: "Maria Agustina",
        medicocabecera: 11,
        clave: "6"
    },
    //________________________________________________________________
    {
        documento: 2354875,
        nombre: "Ana Gonzalez",
        medicocabecera: 123456,
        clave: "b23va"
    },
    //________________________________________________________________
    {
        documento: 6542157,
        nombre: "Jorge Perez",
        medicocabecera: 111111,
        clave: "123ab"
    },
    //________________________________________________________________
    {
        documento: 3587458,
        nombre: "Luis Rodriguez",
        medicocabecera: 123456,
        clave: "aaaaa"
    },
    //________________________________________________________________
    {
        documento: 3254125,
        nombre: "Pedro Rodriguez",
        medicocabecera: 654321,
        clave: "Aa111"
    },
    //________________________________________________________________
    {
        documento: 2653214,
        nombre: "Cecilia Demaria",
        medicocabecera: 111111,
        clave: "bbb22"
    },
    //________________________________________________________________
    {
        documento: 3625487,
        nombre: "Elena Jimenez",
        medicocabecera: 123456,
        clave: "elena"
    }
];
//________________________________________________________________
//________________________________________________________________

//Actiaciones Clínicas
var actuacionesClinicas = [
    {
        nroActuacion: 1,
        paciente: 1,
        medico: 33, //Radiologo
        fecha: new Date(2018, 2, 20),
        motivo: "Dolor de cabeza extremo.",
        diagnostico: "Jaqueca.",
        prescripcion: "Un perifar 600 cada 3hs. 3 dias de reposo. Hacerse una tomografia computada x las dudas.",
        imagen: ""
    },
    {
        nroActuacion: 2,
        paciente: 1,
        medico: 22, //Medicina General
        fecha: new Date(2018, 2, 20),
        motivo: "Dolor lumbar.",
        diagnostico: "Lumbalgia.",
        prescripcion: "Inyecciones de desinflamantes. Reposo 1 semana.",
        imagen: "img1.jpg"
    },
//________________________________________________________________
    {
        nroActuacion: 3,
        paciente: 2,
        medico: 44, //Oculista
        fecha: new Date(2017, 9, 24),
        motivo: "No ve de cerca.",
        diagnostico: "Posble miopia.",
        prescripcion: "Pase al oculista.",
        imagen: ""
    },
    {
        nroActuacion: 4,
        paciente: 2,
        medico: 22, //Medicina General
        fecha: new Date(2017, 10, 8),
        motivo: "Ve menos que Ray Charles.",
        diagnostico: "Miopia.",
        prescripcion: "Hacerse lentes.",
        imagen: "img2.jpg"
    },
//________________________________________________________________
    {
        nroActuacion: 5,
        paciente: 3,
        medico: 55, //Urologo
        fecha: new Date(2018, 2, 20),
        motivo: "Le dan ganas de ir al baño muy a menudo.",
        diagnostico: "Problemas de retencion .",
        prescripcion: "Pase al urologo.",
        imagen: ""
    },
    {
        nroActuacion: 6,
        paciente: 3,
        medico: 22, //Medicina General
        fecha: new Date(2018, 3, 1),
        motivo: "Problemas de retencion.",
        diagnostico: "Cistitis.",
        prescripcion: "Pastilla pa la cistitis. Tomar una c/8 hs.",
        imagen: "img3.jpg"
    },
//________________________________________________________________
    {
        nroActuacion: 7,
        paciente: 4,
        medico: 33, //Radiologo
        fecha: new Date(2018, 1, 17),
        motivo: "Le duele la rodilla por golpe fuerte.",
        diagnostico: "Rodilla inflamada.",
        prescripcion: "Un desinflamante cada 8hs.",
        imagen: ""
    },
    {
        nroActuacion: 8,
        paciente: 4,
        medico: 11, //Medicina General
        fecha: new Date(2018, 3, 22),
        motivo: "Se inflamo la rodilla.",
        diagnostico: "Ta jodido.",
        prescripcion: "Marcha pal yeso...",
        imagen: "img4.jpg"
    },
//________________________________________________________________
    {
        nroActuacion: 9,
        paciente: 5,
        medico: 44, //Oculista
        fecha: new Date(2017, 6, 2),
        motivo: "Le duele la vista al leer.",
        diagnostico: "Principio de astigmatismo.",
        prescripcion: "Pase al oculista.",
        imagen: ""
    },
    {
        nroActuacion: 10,
        paciente: 5,
        medico: 11, //Medicina General 
        fecha: new Date(2018, 7, 20),
        motivo: "Problemas de vision.",
        diagnostico: "Ta chikato.",
        prescripcion: "Gafas level 8.",
        imagen: "img5.jpg"
    },
//________________________________________________________________
    {
        nroActuacion: 11,
        paciente: 6,
        medico: 55, //Urologo
        fecha: new Date(2017, 11, 24),
        motivo: "Se corto mal las uñas y ahora le duele el dedo gordo del pie…",
        diagnostico: "Uña encarnada.",
        prescripcion: "Alicate nuevo, pase al urologo (????).",
        imagen: ""
    },
    {
        nroActuacion: 12,
        paciente: 6,
        medico: 11, //Medicina General
        fecha: new Date(2018, 0, 1),
        motivo: "Uña encarnada.",
        diagnostico: "Error de pase por parte de Med.General.",
        prescripcion: "Revisión psicologica del medico de cabecera.",
        imagen: "img6.jpg"
    }
];