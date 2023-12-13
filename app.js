
const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const lista = document.getElementById('lista')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tareas = {}

document.addEventListener('DOMContentLoaded', () =>{

    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

lista.addEventListener('click', e => {
    btnAccion(e)
})


formulario.addEventListener('submit', e =>{
    e.preventDefault()
    setTarea(e)
})

const setTarea = e =>{

    const texto = e.target.querySelector('input').value
    if(texto.trim() === ' ') {
        console.log('esta vacio')
        return
    }

    const tarea ={
        id: Date.now(),
        texto: texto ,
        estado: false
    }
    tareas[tarea.id] = tarea
    pintarTareas()

   // console.log(tareas)
    
    formulario.reset()
    input.focus()

}

const pintarTareas = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas))

    if(Object.values(tareas).length === 0){

        lista.innerHTML = `
        <div class="alert alert-dark text-center">
        No existen tareas pendientes
        </div>
        `
        return
    }

    lista.innerHTML = ''
    Object.values(tareas).forEach(tarea =>{
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if(tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning','alert-primary' )
            clone.querySelectorAll('.fas')[0].classList.replace('fa-circle-check','fa-rotate-left')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll ('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll ('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    lista.appendChild(fragment)
}
const btnAccion = e =>{
    // console.log(e.target.classList.contains('fa-circle-check'))
    if(e.target.classList.contains('fa-circle-check')){
        // sconsole.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
        // console.log(tareas)
    }
    if (e.target.classList.contains('fa-circle-minus')){
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }
    if(e.target.classList.contains('fa-rotate-left')){
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }
    e.stopPropagation()
}