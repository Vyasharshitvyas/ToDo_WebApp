document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('newTask');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add new task
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Add task with Enter key
    taskInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✔️';
        completeBtn.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(completeBtn);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.textContent.slice(0, -2).trim(),
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const completeBtn = document.createElement('button');
            completeBtn.textContent = '✔️';
            completeBtn.addEventListener('click', function() {
                taskItem.classList.toggle('completed');
                saveTasks();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(taskItem);
                saveTasks();
            });

            taskItem.appendChild(completeBtn);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }
});
