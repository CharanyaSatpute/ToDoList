const inputBox = document.getElementById('input-box');
const taskForm = document.getElementById('task-form');
const listContainer = document.getElementById('list-container');

function createTask(text, completed = false) {
    const li = document.createElement('li');
    li.classList.toggle('checked', completed);

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'toggle-task';
    toggleButton.setAttribute('aria-pressed', String(completed));
    toggleButton.textContent = completed ? 'Completed' : 'Mark complete';

    const label = document.createElement('span');
    label.className = 'task-label';
    label.textContent = text;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-task';
    removeButton.setAttribute('aria-label', `Remove ${text}`);
    removeButton.textContent = '×';

    li.append(toggleButton, label, removeButton);
    return li;
}

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = inputBox.value.trim();
    if (!taskText) {
        inputBox.focus();
        return;
    }

    listContainer.appendChild(createTask(taskText));
    inputBox.value = '';
    saveData();
});

listContainer.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    const task = button?.closest('li');
    if (!button || !task) return;

    if (button.classList.contains('toggle-task')) {
        const completed = task.classList.toggle('checked');
        button.setAttribute('aria-pressed', String(completed));
        button.textContent = completed ? 'Completed' : 'Mark complete';
    } else if (button.classList.contains('remove-task')) {
        task.remove();
    }
    saveData();
});

function saveData() {
    const tasks = Array.from(listContainer.querySelectorAll('li')).map((task) => ({
        text: task.querySelector('.task-label').textContent,
        completed: task.classList.contains('checked')
    }));
    localStorage.setItem('data', JSON.stringify(tasks));
}

function showTask() {
    const saved = localStorage.getItem('data');
    if (!saved) return;

    try {
        const tasks = JSON.parse(saved);
        if (Array.isArray(tasks)) {
            tasks.forEach((task) => {
                if (typeof task.text === 'string') {
                    listContainer.appendChild(createTask(task.text, Boolean(task.completed)));
                }
            });
            return;
        }
    } catch {
        // Older versions stored task markup; migrate it below.
    }

    const legacyList = document.createElement('ul');
    legacyList.innerHTML = saved;
    for (const oldTask of legacyList.querySelectorAll('li')) {
        const label = oldTask.querySelector('.task-label');
        const text = label
            ? label.textContent
            : Array.from(oldTask.childNodes)
                .filter((node) => node.nodeType === Node.TEXT_NODE)
                .map((node) => node.textContent)
                .join('')
                .trim();
        if (text) {
            listContainer.appendChild(createTask(text, oldTask.classList.contains('checked')));
        }
    }
}
showTask();
