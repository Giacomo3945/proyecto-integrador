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


/* BUSCADOR DE RECURSOS - Conty */

// 1. Buscamos el input de búsqueda
const buscadorRecursos = document.getElementById("buscador-recursos");

// 2. Buscamos todas las tarjetas de la sección de Recursos
const tarjetasRecursos = document.querySelectorAll("#recursos .card");

// 3. Escuchamos el evento "input" (se dispara cada vez que se escribe algo)
buscadorRecursos.addEventListener("input", function () {

    // 3.1. Guardamos el texto escrito, en minúsculas (para que no importe mayúscula/minúscula)
    const textoBuscado = buscadorRecursos.value.toLowerCase();

    // 3.2. Recorremos cada tarjeta
    tarjetasRecursos.forEach(function (tarjeta) {

        // Buscamos el título dentro de la tarjeta
        const titulo = tarjeta.querySelector(".card-title").textContent.toLowerCase();

        // Si el título incluye el texto buscado, mostramos la tarjeta; si no, la ocultamos
        if (titulo.includes(textoBuscado)) {
            tarjeta.parentElement.style.display = ""; // Mostrar (el padre es el <div class="col">)
        } else {
            tarjeta.parentElement.style.display = "none"; // Ocultar
        }
    });
});


/* ANIMACIÓN DE CONTEO EN ESTADÍSTICAS - Conty */

// Buscamos todos los elementos que tienen el número a animar
const numerosEstadisticas = document.querySelectorAll("#estadisticas .numero");

// Buscamos la sección completa, para deectar cuando entra en pantalla
const seccionEstadisticas = document.getElementById("estadisticas");

// Anima un número específico desde 0 hasta su valor final
function animarNumero(elemento) {

    // Guardamos el texto original completo (ej: "85%")
    const textoOriginal = elemento.textContent;

    // Sacamos solo la parte numérica (ej: de "85%" saca 85)
    const valorFinal = parseInt(textoOriginal);

    // Guardamos lo que acompaña al número (ej: "%"). Si no hay nada, queda ""
    const sufijo = textoOriginal.replace(/[0-9]/g, "");

    // Mostramos el 0 inicial
    elemento.textContent = "0" + sufijo;

    // Pausa antes de empezar la animación 
    setTimeout(function () {

        let valorActual = 0;

        // Cantidad de pasos para que todos tengan la misma fluidez
        const pasos = 90;

        // Incremento por paso, calculado segun el valor final
        const incremento = valorFinal / pasos;

        // Actualizamos el numero progresivamente hasta alcanzar el valor final
        const intervalo = setInterval(function () {
            valorActual += incremento;

            if (valorActual >= valorFinal) {
                valorActual = valorFinal;
                clearInterval(intervalo);
            }

            // Se redondea al entero más cercano, para mostrar un número prolijo (sin decimales)
            elemento.textContent = Math.round(valorActual) + sufijo;
        }, 18);

    }, 700);
}

// Detectamos cuándo la sección estadísticas entra en pantalla (observer)
const observador = new IntersectionObserver(function (entradas) {

    // "entradas" es una lista de los elementos observados (acá solo tenemos 1: la sección)
    entradas.forEach(function (entrada) {

        // isIntersecting es true cuando el elemento entró en pantalla
        if (entrada.isIntersecting) {

            // Animamos cada número
            numerosEstadisticas.forEach(function (numero) {
                animarNumero(numero);
            });

            //Dejamos de observar para que la animación no se repita
            observador.unobserve(seccionEstadisticas);
        }
    });
});

// Se activa la observación de la sección de estadísticas
observador.observe(seccionEstadisticas);