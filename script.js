const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask(){
    if(inputBox.value === ''){    //checking empty condition
        alert('You must write something');
    }
    else{
        let li = document.createElement('li');  //creating li tag and adding a value & appending to the list-container, same appplies to the span
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML='\u00d7';
        li.appendChild(span);
    }
    inputBox.value=''// to make the placeholder value as empty string
    saveData();
}

listContainer.addEventListener('click', function(e){
    if(e.target.tagName ==='LI'){
        e.target.classList.toggle('checked');
        saveData();
    }
    else if (e.target.tagName==='SPAN'){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML= localStorage.getItem('data');
}
showTask()