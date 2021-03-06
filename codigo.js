"use strict";

// Principal
var oSpotify = new Spotify();

// EVENTOS A BOTONES ----------------------------------------------------------------------------------------------------------------------------------
// NavBar
document.getElementById("playlist").addEventListener("click",mostrarFormCrearPlaylist);
document.getElementById("suscripciones").addEventListener("click",mostrarFormSuscripcion);
document.getElementById("inicioSesion").addEventListener("click",mostrarFormInicioSesion);

// Formulario Suscripcion
document.getElementById("btnSuscripcion").addEventListener("click",añadirSuscripcion);

// Formulario Crear Playlist
document.getElementById("radioTodos").addEventListener("click",opcionesTodas);
document.getElementById("radioRock").addEventListener("click",opcionesRock);
document.getElementById("radioPop").addEventListener("click",opcionesPop);
document.getElementById("radioFlamenco").addEventListener("click",opcionesFlamenco);
document.getElementById("btnAñadirCancion").addEventListener("click",añadirCanciones);
document.getElementById("btnEliminarCancion").addEventListener("click",eliminarCanciones);
document.getElementById("btnCrearPlaylist").addEventListener("click",añadirPlaylist);
document.getElementById("btnMostrarModPlaylist").addEventListener("click",mostrarFormModPlaylist);

// Formulario Modificar Playlist
document.getElementById("radioTodosMod").addEventListener("click",opcionesTodasMod);
document.getElementById("radioRockMod").addEventListener("click",opcionesRockMod);
document.getElementById("radioPopMod").addEventListener("click",opcionesPopMod);
document.getElementById("radioFlamencoMod").addEventListener("click",opcionesFlamencoMod);
document.getElementById("btnAñadirCancionMod").addEventListener("click",añadirCancionesMod);
document.getElementById("btnEliminarCancionMod").addEventListener("click",eliminarCancionesMod);
document.getElementById("btnModificarPlaylist").addEventListener("click",modificarPlaylist);
document.getElementById("btnCancelarModPlaylist").addEventListener("click",mostrarFormCrearPlaylist);

// FORMULARIOS ----------------------------------------------------------------------------------------------------------------------------------

// ocultarFormularios(); 
ocultarFormularios();

// Oculta los formularios por defecto -----------------------------------------------------------------------------------------------
function ocultarFormularios() {
    formInicioSesión.style.display = "none";
    formSuscripcion.style.display = "none";
    formCrearPlaylist.style.display = "none";
    formModPlaylist.style.display = "none";
}

// FORMULARIO DE INICIO DE SESION ----------------------------------------------------------------------------------------------------------
// Muestra el formulario de Inicio de Sesión 
function mostrarFormInicioSesion() {
    ocultarFormularios();
    formInicioSesión.style.display = "block";
}

// FORMULARIO DE SUSCRIPCION ----------------------------------------------------------------------------------------------------------
// Muestra el formulario de Suscripción
function mostrarFormSuscripcion() {
    ocultarFormularios();
    formSuscripcion.style.display = "block";
}

// Limpia los campos del formulario
function limpiarCamposSuscripcion(){
    formSuscripcion.nombre.value = "";
    formSuscripcion.email.value = "";
    formSuscripcion.password.value = "";
    formSuscripcion.password2.value = "";
    formSuscripcion.checkboxPremium_0.checked = false;
}

// Confirmar suscripción
function añadirSuscripcion(){
    let oCliente;
    let nombre = formSuscripcion.nombre.value;
    let email = formSuscripcion.email.value;
    let contraseña = formSuscripcion.password.value;
    let suscripcion = formSuscripcion.checkboxPremium_0.checked;
    if(suscripcion){
        oCliente = new Suscripcion(nombre,email,contraseña,[],suscripcion);
    }else{
        oCliente = new Cliente(nombre,email,contraseña,[]);
    }

    if(oSpotify.añadirSuscripcion(oCliente)){
        alert("Cliente añadido");
        limpiarCamposSuscripcion();
        ocultarFormularios();
    }else{
        alert("Ese cliente ya existe");
    }
}

// FORMULARIO DE CREAR PLAYLIST ----------------------------------------------------------------------------------------------------------
// Muestra el formulario de Crear Playlist
function mostrarFormCrearPlaylist() {
    ocultarFormularios();
    formCrearPlaylist.style.display = "block";
}

// Limpia los campos del formulario
function limpiarCamposCrearPlaylist(){
    formCrearPlaylist.nombrePlayList.value = "";
    formCrearPlaylist.radioGenero.value = "todos";
    opcionesTodas();
}

// Elimina las canciones de la lista
function limpiarComboCrearCanciones(){
    var listaCanciones = document.getElementById("comboCrearCanciones");
    while(listaCanciones.childElementCount > 0){
        listaCanciones.removeChild(listaCanciones.childNodes[0]);
    }
}

// Da como opción todas las canciones
function opcionesTodas(){
    limpiarComboCrearCanciones();
    let todasCanciones = oSpotify.canciones;
    var listaCanciones = document.getElementById("comboCrearCanciones");
    
    for(var i = 0; i < todasCanciones.length; i++){
        var opcion = document.createElement("option");
        opcion.text = todasCanciones[i].titulo;
        opcion.value = todasCanciones[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género ROCK
function opcionesRock(){
    limpiarComboCrearCanciones();
    let cancionesRock = oSpotify.filtrarCanciones("ROCK");
    var listaCanciones = document.getElementById("comboCrearCanciones");
    
    for(var i = 0; i < cancionesRock.length; i++){
        var opcion = document.createElement("option");
        opcion.text = cancionesRock[i].titulo;
        opcion.value = cancionesRock[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género POP
function opcionesPop(){
    limpiarComboCrearCanciones();
    let cancionesPop = oSpotify.filtrarCanciones("POP");
    var listaCanciones = document.getElementById("comboCrearCanciones");
    
    for(var i = 0; i < cancionesPop.length; i++){
        var opcion = document.createElement("option");
        opcion.text = cancionesPop[i].titulo;
        opcion.value = cancionesPop[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género FLAMENCO
function opcionesFlamenco(){
    limpiarComboCrearCanciones();
    let cancionesFlamenco = oSpotify.filtrarCanciones("FLAMENCO");
    var listaCanciones = document.getElementById("comboCrearCanciones");
    
    for(var i = 0; i < cancionesFlamenco.length; i++){
        var opcion = document.createElement("option");
        opcion.text = cancionesFlamenco[i].titulo;
        opcion.value = cancionesFlamenco[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Añadir canciones a la playlist
function añadirCanciones(){
    var listaCanciones = document.getElementById("comboCrearCanciones");
    var playlist = document.getElementById("comboCrearPlaylist");
    var valoresListaCanciones = listaCanciones.options;
    var valoresPlaylist = playlist.options;

    for(var i = 0; i < valoresListaCanciones.length; i++){
        var noPasar = false;
        if(valoresListaCanciones[i].selected){
            for(var j = 0; j < valoresPlaylist.length; j++){
                if(valoresListaCanciones[i].value == valoresPlaylist[j].value){
                    noPasar = true;
                }
            }
            if(!noPasar){
                var opcion = document.createElement("option");
                opcion.text = valoresListaCanciones[i].text;
                opcion.value = valoresListaCanciones[i].value;
                valoresPlaylist.add(opcion);
            }
        }
    }
}

// Eliminar canciones de la playlist
function eliminarCanciones(){
    var playlist = document.getElementById("comboCrearPlaylist");
    var valoresPlaylist = playlist.options;

    for(var i = (valoresPlaylist.length-1); i >= 0; i--){
        if(valoresPlaylist[i].selected){
            playlist.remove(i);
        }
    }
}

// Añadir playlist
function añadirPlaylist(){

    limpiarCamposCrearPlaylist();
}

// FORMULARIO DE MODIFICAR PLAYLIST ----------------------------------------------------------------------------------------------------------
// Muestra el formulario de Modificar Playlist 
function mostrarFormModPlaylist() {
    ocultarFormularios();
    formModPlaylist.style.display = "block";
}

// Limpia los campos del formulario
function limpiarCamposModPlaylist(){
    formModPlaylist.selectPlaylist.selectedIndex = "0";
    formModPlaylist.radioGeneroMod.value = "todos";
    opcionesTodasMod();
}

// Elimina las canciones de la lista
function limpiarComboModCanciones(){
    var listaCanciones = document.getElementById("comboCanciones");
    while(listaCanciones.childElementCount > 0){
        listaCanciones.removeChild(listaCanciones.childNodes[0]);
    }
}

// Da como opción todas las canciones
function opcionesTodasMod(){
    limpiarComboModCanciones();
    let todasCanciones = oSpotify.canciones;
    var listaCanciones = document.getElementById("comboCanciones");
    
    for(var i = 0; i < todasCanciones.length; i++){
        var opcion = document.createElement("option");
        opcion.text = todasCanciones[i].titulo;
        opcion.value = todasCanciones[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género ROCK
function opcionesRockMod(){
    limpiarComboModCanciones();
    let cancionesRock = oSpotify.filtrarCanciones("ROCK");
    var listaCanciones = document.getElementById("comboCanciones");
    
    for(var i = 0; i < cancionesRock.length; i++){
        var opcion = document.createElement("option");
        opcion.text = cancionesRock[i].titulo;
        opcion.value = cancionesRock[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género POP
function opcionesPopMod(){
    limpiarComboModCanciones();
    let cancionesPop = oSpotify.filtrarCanciones("POP");
    var listaCanciones = document.getElementById("comboCanciones");
    
    for(var i = 0; i < cancionesPop.length; i++){
        var opcion = document.createElement("option");
        opcion.text = cancionesPop[i].titulo;
        opcion.value = cancionesPop[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Da como opción las canciones de género FLAMENCO
function opcionesFlamencoMod(){
    limpiarComboModCanciones();
    let cancionesFlamenco = oSpotify.filtrarCanciones("FLAMENCO");
    var listaCanciones = document.getElementById("comboCanciones");
    
    for(var i = 0; i < cancionesFlamenco.length; i++){
        var opcion = document.createElement("option");
        opcion.text = cancionesFlamenco[i].titulo;
        opcion.value = cancionesFlamenco[i].titulo;
        listaCanciones.add(opcion);
    }
}

// Añadir canciones a la playlist
function añadirCancionesMod(){
    var listaCanciones = document.getElementById("comboCanciones");
    var playlist = document.getElementById("comboPlaylist");
    var valoresListaCanciones = listaCanciones.options;
    var valoresPlaylist = playlist.options;

    for(var i = 0; i < valoresListaCanciones.length; i++){
        var noPasar = false;
        if(valoresListaCanciones[i].selected){
            for(var j = 0; j < valoresPlaylist.length; j++){
                if(valoresListaCanciones[i].value == valoresPlaylist[j].value){
                    noPasar = true;
                }
            }
            if(!noPasar){
                var opcion = document.createElement("option");
                opcion.text = valoresListaCanciones[i].text;
                opcion.value = valoresListaCanciones[i].value;
                valoresPlaylist.add(opcion);
            }
        }
    }
}

// Eliminar canciones de la playlist
function eliminarCancionesMod(){
    var playlist = document.getElementById("comboPlaylist");
    var valoresPlaylist = playlist.options;

    for(var i = (valoresPlaylist.length-1); i >= 0; i--){
        if(valoresPlaylist[i].selected){
            playlist.remove(i);
        }
    }
}

// Modificar playlist
function modificarPlaylist(){
    
    limpiarCamposModPlaylist();
}

// FUNCIONES DE BUSQUEDA ----------------------------------------------------------------------------------------------------------------
function _buscarCliente(email){
    let oClienteExistente = null;
    oClienteExistente = oSpotify.clientes.find(oCliente => oCliente.correo == email);
    return oClienteExistente;
}

function _buscarPremium(email){
    let oClientePremium = null;
    oClientePremium = oSpotify.clientes.find(oCliente => oCliente.correo == email && oCliente instanceof Suscripcion);
    return oClientePremium;
}

function _buscarCanciones(generoBuscado){
    let cancionesGenero = [];
    for(var i = 0; i < oSpotify.canciones.length; i++){
        if(oSpotify.canciones[i].genero == generoBuscado){
            cancionesGenero.push(oSpotify.canciones[i]);
        }
    }
    return cancionesGenero;
}