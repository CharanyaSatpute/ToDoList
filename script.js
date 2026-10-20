const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    const taskText = inputBox.value.trim();
    if (!taskText) {
        alert('You must write something');
        return;
    }

    const li = document.createElement('li');
    li.append(document.createTextNode(taskText));

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-task';
    removeButton.setAttribute('aria-label', `Remove ${taskText}`);
    removeButton.textContent = '×';
    li.appendChild(removeButton);

    listContainer.appendChild(li);
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function (event) {
    const removeButton = event.target.closest('.remove-task');
    if (removeButton) {
        removeButton.closest('li').remove();
        saveData();
        return;
    }

    const task = event.target.closest('li');
    if (task) {
        task.classList.toggle('checked');
        saveData();
    }
});

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
}

showTask();
