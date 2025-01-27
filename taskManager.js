const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskPriority = document.getElementById('taskPriority');
const taskList = document.getElementById('taskList');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const generateID = () => 'task-' + Date.now();


function addTask(event) {
    event.preventDefault();

    
    const newTask = {
        id: generateID(),
        title: taskTitle.value,
        description: taskDescription.value,
        priority: taskPriority.value,
        completed: false
    };

   
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    
    taskForm.reset();
    displayTasks();
}


function displayTasks() {
    taskList.innerHTML = ''; 
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        if (task.completed) taskElement.classList.add('task-completed');

        taskElement.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <small>Priority: ${task.priority}</small>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="completeTask('${task.id}')">Complete</button>
                <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });
}


function completeTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}


taskForm.addEventListener('submit', addTask);


displayTasks();