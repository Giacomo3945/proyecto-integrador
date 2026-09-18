/*   GECO - JavaScript */

/*  FORMULARIO DE SOLICITUDES - Nadia */


// Buscamos el formulario y el contenedor donde mostraremos los mensajes
const formSolicitud = document.getElementById("form-solicitud");
const mensajeSolicitud = document.getElementById("mensaje-solicitud");


// Escuchamos el evento "submit" (cuando se envía el formulario)
formSolicitud.addEventListener("submit", function (evento) {
    // Evita que la página se recargue, que es el comportamiento por defecto
    evento.preventDefault();

    // Guardamos los campos que queremos validar
    const ubicacion = document.getElementById("ubicacion");
    const descripcion = document.getElementById("descripcion");
    const contacto = document.getElementById("contacto-solicitud");
    // PARA QUE FUNCIONE LA TARJETA
    const tipo = document.getElementById("tipo-solicitud");
    const prioridad = document.getElementById("prioridad");
    

    // Array donde vamos a juntar los campos que estén vacíos
    const camposVacios = [];

    // Limpiamos las marcas de error de una validación anterior
    ubicacion.classList.remove("is-invalid");
    descripcion.classList.remove("is-invalid");
    contacto.classList.remove("is-invalid");

    // Revisamos cada campo: trim() saca los espacios en blanco de los extremos
    if (ubicacion.value.trim() === "") {
        ubicacion.classList.add("is-invalid");
        camposVacios.push("Ubicación");
    }

    if (descripcion.value.trim() === "") {
        descripcion.classList.add("is-invalid");
        camposVacios.push("Descripción detallada");
    }

    if (contacto.value.trim() === "") {
        contacto.classList.add("is-invalid");
        camposVacios.push("Contacto");
    }

    // Si hay campos vacíos, mostramos el error y cortamos acá
    if (camposVacios.length > 0) {
        mensajeSolicitud.innerHTML = `
            <div class="alert alert-danger mt-3">
                <i class="bi bi-exclamation-circle"></i>
                Faltan completar estos campos: ${camposVacios.join(", ")}
            </div>
        `;
        return;
    }
// 1. Buscamos el contenedor exacto que agrupa las tarjetas
    const contenedorTarjetas = document.querySelector(".solicitudes-recientes .cards"); 
    
    // 2. Creamos el elemento <article> con la clase "card"
    const nuevaTarjeta = document.createElement("article");
    nuevaTarjeta.classList.add("card");

    // 3. Armamos la estructura interna leyendo los values de los inputs
    nuevaTarjeta.innerHTML = `
        <h3><i class="bi bi-info-circle"></i> ${tipo.value} - ${ubicacion.value}</h3>
        <p><strong>Prioridad:</strong> ${prioridad.value}</p>
        <p><strong>Estado:</strong> Pendiente</p>
        <p><strong>Contacto:</strong> ${contacto.value}</p>
        <span class="badge badge-pendiente">Pendiente</span>
    `;

    // 4. Insertamos la tarjeta al principio del contenedor
    if (contenedorTarjetas) {
        contenedorTarjetas.prepend(nuevaTarjeta);
    }
    // Si llegamos hasta acá, está todo completo
    mensajeSolicitud.innerHTML = `
        <div class="alert alert-success mt-3">
            <i class="bi bi-check-circle"></i>
            Solicitud enviada correctamente.
        </div>
    `;

    // Limpiamos el formulario
    formSolicitud.reset();
});



/*  Filtro de emergencias por gravedad - Giacomo */

// 1. Seleccionamos todos los botones de filtro
const botonesFiltro = document.querySelectorAll(".btn-filtro");

// 2. Seleccionamos todas las tarjetas de emergencia
const tarjetasEmergencia = document.querySelectorAll("#emergencias .card");

// 3. Recorremos cada botón y le agregamos un evento "click"
botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
        
        // 3.1. Quitamos la clase "active" de TODOS los botones
        botonesFiltro.forEach(function (b) {
            b.classList.remove("active");
        });
        
        // 3.2. Agregamos la clase "active" SOLO al botón clickeado
        boton.classList.add("active");
        
        // 3.3. Obtenemos la gravedad seleccionada del atributo data-gravedad
        const gravedadSeleccionada = boton.getAttribute("data-gravedad");
        
        // 3.4. Recorremos cada tarjeta y decidimos si mostrarla u ocultarla
        tarjetasEmergencia.forEach(function (tarjeta) {
            const gravedadTarjeta = tarjeta.getAttribute("data-gravedad");
            
            // Si el filtro es "Todas" o la gravedad coincide, mostramos la tarjeta
            if (gravedadSeleccionada === "Todas" || gravedadTarjeta === gravedadSeleccionada) {
                tarjeta.parentElement.style.display = ""; // Mostrar (el padre es el <div class="col">)
            } else {
                tarjeta.parentElement.style.display = "none"; // Ocultar
            }
        });
    });
});


/* Botón volver arriba - Giacomo */

// 1. Seleccionamos el botón
const btnVolverArriba = document.getElementById("btn-volver-arriba");

// 2. Escuchamos el evento "scroll" de la ventana
// Buscamos la sección de Refugios
const seccionRefugios = document.getElementById("refugios");

window.addEventListener("scroll", function () {
    // Calculamos la posición de la sección de Refugios
    const posicionRefugios = seccionRefugios.offsetTop;
    
    // Si el usuario pasó la sección de Refugios, mostramos el botón
    if (window.scrollY >= posicionRefugios - 200) {
        btnVolverArriba.classList.add("visible");
    } else {
        btnVolverArriba.classList.remove("visible");
    }
});

// 3. Escuchamos el clic en el botón para volver arriba
btnVolverArriba.addEventListener("click", function () {
    // 3.1. Subimos suavemente al inicio de la página
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Animación suave
    });
});