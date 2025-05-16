document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
            taskInput.focus();
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        taskItem.innerHTML = `
            <div class="task-content">${taskText}</div>
            <div class="task-actions">
                <button class="complete-btn">✓</button>
                <button class="delete-btn">✕</button>
            </div>
        `;
        
        taskList.appendChild(taskItem);
        saveTasks();
        
        // Add event listeners to new buttons
        taskItem.querySelector('.complete-btn').addEventListener('click', completeTask);
        taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
    }

    function completeTask(e) {
        const taskItem = e.target.closest('.task-item');
        taskItem.classList.toggle('completed');
        saveTasks();
    }

    function deleteTask(e) {
        const taskItem = e.target.closest('.task-item');
        taskItem.remove();
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(task => {
            tasks.push({
                text: task.querySelector('.task-content').textContent,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            addTask(task.text);
            const taskItems = taskList.querySelectorAll('.task-item');
            const lastTask = taskItems[taskItems.length - 1];
            if (task.completed) {
                lastTask.classList.add('completed');
            }
        });
    }
});