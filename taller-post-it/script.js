// Paso 3.1: Selección de elementos del DOM
// Se seleccionan todos los elementos HTML necesarios para interactuar con la página.
const noteInput = document.getElementById('new-note-input');
const addButton = document.getElementById('add-note-button');
const notesContainer = document.getElementById('notes-container');
const toggleThemeButton = document.getElementById('toggle-theme-button');
const body = document.body;
const colors = ['note-yellow', 'note-blue', 'note-pink'];

// --- Funciones principales ---

// Requisito: Crear un nuevo elemento de nota
// Esta función encapsula la lógica para crear un elemento de nota, lo que la hace reutilizable.
function createNoteElement(text, colorClass) {
    const noteDiv = document.createElement('div');
    // Se usa classList para agregar múltiples clases, incluyendo la de color.
    noteDiv.classList.add('note', colorClass); 
    noteDiv.textContent = text;

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'x';

    noteDiv.appendChild(deleteButton);
    return noteDiv;
}

// Requisito: Guardar datos en localStorage
// La función convierte el array de notas a una cadena JSON antes de guardarlo.
function saveNotes() {
    const notesData = [];
    notesContainer.querySelectorAll('.note').forEach(noteEl => {
        // Obtenemos el texto de la nota y la clase de color para guardarlos como un objeto.
        const text = noteEl.textContent.slice(0, -1);
        const colorClass = Array.from(noteEl.classList).find(c => c.startsWith('note-'));
        notesData.push({ text, color: colorClass });
    });
    localStorage.setItem('notes', JSON.stringify(notesData));
}

// Requisito: Cargar datos desde localStorage
// La función recupera los datos guardados y los recrea en el DOM.
function loadNotes() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        // Se usa JSON.parse() para convertir la cadena JSON de vuelta a un array.
        const notes = JSON.parse(storedNotes);
        notes.forEach(noteData => {
            const newNote = createNoteElement(noteData.text, noteData.color);
            notesContainer.appendChild(newNote);
        });
    }
}

// Requisito: Implementar el tema oscuro/claro
// Esta función se encarga de aplicar la preferencia guardada al iniciar.
function setInitialTheme() {
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        toggleThemeButton.textContent = 'Modo Claro';
    }
}

// --- Manejo de Eventos ---

// Requisito: Implementar la validación con el evento 'input'
// Este evento se dispara con cada pulsación de tecla, permitiendo validación en tiempo real.
noteInput.addEventListener('input', () => {
    addButton.disabled = noteInput.value.trim() === '';
});

// Requisito: Alternar el tema con el evento 'click'
toggleThemeButton.addEventListener('click', () => {
    // classList.toggle() es ideal para alternar clases de forma eficiente.
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('isDarkMode', isDarkMode);
    toggleThemeButton.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
});

// Requisito: Editar una nota con el evento 'dblclick'
// Se usa delegación de eventos en el contenedor padre para manejar todos los clics de doble clic.
notesContainer.addEventListener('dblclick', (event) => {
    const target = event.target;
    if (target.classList.contains('note')) {
        const currentText = target.textContent.slice(0, -1);
        target.textContent = '';
        target.classList.add('editing');

        const textarea = document.createElement('textarea');
        textarea.value = currentText;
        target.appendChild(textarea);
        textarea.focus();

        function saveEdit() {
            const newText = textarea.value.trim();
            target.textContent = newText;
            target.classList.remove('editing');
            
            const deleteButton = document.createElement('span');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'x';
            target.appendChild(deleteButton);

            saveNotes();
        }
        // Se usan los eventos blur y keydown para guardar los cambios.
        textarea.addEventListener('blur', saveEdit);
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveEdit();
            }
        });
    }
});

// Requisito: Agregar nota con el evento 'click'
addButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newNote = createNoteElement(noteText, randomColor);
        notesContainer.appendChild(newNote);
        noteInput.value = '';
        addButton.disabled = true;
        saveNotes();
    }
});

// Requisito: Eliminar nota con el evento 'click' y delegación
notesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
        saveNotes();
    }
});

// Requisito: Efecto visual con mouseover y mouseout
// Estos eventos manipulan directamente los estilos inline del elemento.
notesContainer.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('note')) {
        event.target.style.boxShadow = '0 0 15px rgba(0,0,0,0.3)';
    }
});

notesContainer.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('note')) {
        event.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// --- Carga inicial de la aplicación ---
// Se llama a estas funciones al final del script para que todo se cargue correctamente.
setInitialTheme();
loadNotes();