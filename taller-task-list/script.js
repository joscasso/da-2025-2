// 1. Seleccionar elementos del DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const darkModeBtn = document.getElementById('dark-mode-btn');

// 2. Función para guardar las tareas en localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach(item => {
        tasks.push(item.firstChild.textContent);
    });

    // Se usa JSON.stringify() para convertir el array a una cadena antes de guardar.
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 3. Función para cargar las tareas desde localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    console.log(storedTasks)
    
    if (storedTasks) {
        // Se usa JSON.parse() para convertir la cadena de vuelta a un array.
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }
}

// 4. Función para crear un nuevo elemento de tarea en el DOM
function createTaskElement(taskText) {
    // a. Crear un elemento de lista (li)
    const li = document.createElement('li');
    li.className = 'task-item';
    li.textContent = taskText;

    // b. Crear el botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'x';
    
    // c. Agregar evento de clic al botón de eliminar
    deleteBtn.addEventListener('click', () => {
        li.remove(); // Elimina el elemento de la lista del DOM
        saveTasks(); // Vuelve a guardar las tareas después de la eliminación
    });

    // d. Agregar el botón al elemento de la lista
    li.appendChild(deleteBtn);
    
    // e. Agregar el elemento de lista al contenedor de tareas (ul)
    taskList.appendChild(li);
}

// 5. Agregar evento de clic al botón de agregar
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        createTaskElement(taskText);
        taskInput.value = ''; // Limpiar el input
        addTaskBtn.disabled = true;
        saveTasks(); // Guardar las tareas
    }
});

// Habilta el botón Agregar si hay un dato ingresado
taskInput.addEventListener('input', () => {
    const taskText = taskInput.value.trim();
    if (taskText == '') {
        addTaskBtn.disabled = true;
    } else {
        addTaskBtn.disabled = false; 
    }
});

// Habilta el botón Agregar si hay un dato ingresado
taskInput.addEventListener('input', () => {
    const taskText = taskInput.value.trim();
    if (taskText == '') {
        addTaskBtn.disabled = true;
    } else {
        addTaskBtn.disabled = false; 
    }
});

// Requisito: Alternar el tema con el evento 'click'
darkModeBtn.addEventListener('click', () => {
    // classList.toggle() es ideal para alternar clases de forma eficiente.
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('isDarkMode', isDarkMode);
    darkModeBtn.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
});

// 6. Cargar las tareas al iniciar la página
loadTasks();

// Iniciar el botón de Agregar tarea deshabilitado
addTaskBtn.disabled = true; 