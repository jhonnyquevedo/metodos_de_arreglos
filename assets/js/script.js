/* Se definen las constantes */
const listaDeTareas = document.querySelector("#tareas")
const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const tareasTotal = document.querySelector("#total")
const tareasRealizadas = document.querySelector("#realizadas")
/* Se agregan los objetos al arreglo */
const tareas = [
    { id: 1, descripcion: "Hacer mercado", realizada: false },
    { id: 2, descripcion: "Estudiar para la prueba", realizada: false },
    { id: 3, descripcion: "Sacar a pasear a Tobby", realizada: false },
]
/* Se invoca la función actualizarPantalla */
actualizarPantalla()

/* Se define la función actualizarPantalla */
function actualizarPantalla(){
    let html = ""
  
    for (let tarea of tareas) {
        /* Se define mostarColor */
        let mostrarColor=""
        /* Se aplica un Booleano para dar el color a la descripción de la tarea */
        if (tarea.realizada){
            mostrarColor = `<td style="color: green;"> ${tarea.descripcion}</td>`;
        } else {
            mostrarColor = `<td style="color: red;"> ${tarea.descripcion}</td>`;
        }
        html += `<tr>
        <td>${tarea.id}</td>
        ${mostrarColor}
        <td>${tarea.realizada
            ? `<input type="checkbox" onclick="colorear(${tarea.id})" checked="true">`/* se invoca la función colorear */
            : `<input type="checkbox" onclick="colorear(${tarea.id})">`
        }
        <button class="boton" onclick="borrar(${tarea.id})"><strong>X</strong></button></td>
        </tr>`;/* se invoca la función borrar */
    }

    const completadas = tareas.filter((tarea) => tarea.realizada == true);
    const conteo = completadas.length;
    tareasRealizadas.innerHTML = "Realizadas: " + conteo;
    listaDeTareas.innerHTML = html;
    tareasTotal.textContent = `Total: ${tareas.length}`;
    
}

//Se agrega la interacción al botón para que al ser presionado, tome el valor del input y lo agregue como un nuevo elemento al arreglo

btnAgregar.addEventListener("click", () =>{
    if (tareaInput.value == "") {
        alert("Debe agregar una tarea");
        return;
    }
    /* Se agrega la tarea al arreglo */
    const nuevaTarea = tareaInput.value;
    const nuevoId = tareas[tareas.length-1].id;
    tareas.push({id: nuevoId + 1, descripcion: nuevaTarea, realizada: false})
    tareaInput.value = ""; //Para reiniciar el input y volver a dejarlo en blanco, le asignamos un string vacío al value del input.

    /* Se actualiza la información en el HTML */
    actualizarPantalla();
} )

/* Se define la función borrar */
function borrar(id) {
    let item = tareas.findIndex((tarea) => tarea.id === id)
    tareas.splice(item, 1);
    actualizarPantalla();
}


/* Se define la función colorear */
function colorear(id) {
    tareas.map((tarea) => {
        if (tarea.id == id) tarea.realizada = !tarea.realizada;
    });
    actualizarPantalla();
}


