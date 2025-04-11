const darkModeToggle = document.getElementById('darkModeToggle');
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

//Tab
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Quote
const quotes = [
    "Make today beautiful.",
    "Stay focused and never give up.",
    "Every note is a step forward.",
    "You are capable of amazing things.",
    "Lavender days and clear minds."
];
document.getElementById("quote").textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

// Notes
const noteInput = document.getElementById("noteInput");
const addNote = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

function displayNotes() {
    notesContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.innerHTML = `
            <p>${note.text}</p>
            <p class="note-date">${note.date}</p>
            <button class="delete-btn" onclick="deleteNote(${index})">×</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

addNote.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        const notes = JSON.parse(localStorage.getItem("notes") || "[]");
        notes.push({
            text: noteText,
            date: new Date().toLocaleString()
        });
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = '';
        displayNotes();
    }
});

// Tasks
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function displayTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task ${task.done ? 'completed' : ''}`;
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''} 
                onchange="toggleTask(${index})">
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">×</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

addTask.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push({
            text: taskText,
            done: false
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }
});

// Planner
const eventDate = document.getElementById("eventDate");
const eventText = document.getElementById("eventText");
const addEvent = document.getElementById("addEvent");
const eventList = document.getElementById("eventList");

function displayEvents() {
    eventList.innerHTML = '';
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    events.forEach((event, index) => {
        const eventDiv = document.createElement("div");
        eventDiv.className = "event";
        eventDiv.innerHTML = `
            <p>${event.text}</p>
            <p class="event-date">${event.date}</p>
            <button class="delete-btn" onclick="deleteEvent(${index})">×</button>
        `;
        eventList.appendChild(eventDiv);
    });
}

function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
}

addEvent.addEventListener('click', () => {
    const date = eventDate.value;
    const text = eventText.value.trim();
    if (date && text) {
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        events.push({ date, text });
        localStorage.setItem("events", JSON.stringify(events));
        eventDate.value = '';
        eventText.value = '';
        displayEvents();
    }
});


displayNotes();
displayTasks();
displayEvents();