const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')


form.addEventListener('submit', addTask)      // submit при отправке кода!
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);


let tasks = [];

if(localStorage.getItem('tasks')) {
   tasks =  JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title' 
    // добавить задачу на страницу

    const taskHtml = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`

    // добавляем на страницу

    tasksList.insertAdjacentHTML('beforeend', taskHtml);

})

checkEmptyList () 

function addTask(e) {
    e.preventDefault();  // нужно вызвать чтобы отменить стандартное поведение страницы(она обновляется, а это не нужно!!)

    // теперь нужно достать текст из инпута 

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),   // чтобы id всегда было разное!!
        text: taskText,
        done: false,
    };

    tasks.push(newTask);
    
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title' 
    // добавить задачу на страницу

    const taskHtml = `
        <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${newTask.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`

    // добавляем на страницу

    tasksList.insertAdjacentHTML('beforeend', taskHtml);


    // очищаем поле ввода

    taskInput.value = '';
    taskInput.focus(); 

    checkEmptyList () 
    saveToLocalStorage()
}

function deleteTask(event) {

    if (event.target.dataset.action !== 'delete') return; 

    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);

    // const index = tasks.findIndex((task) => task.id == id);
    // tasks.splice(index, 1);

    tasks = tasks.filter((task) => task.id !== id);
    console.log(tasks)
    
    parentNode.remove();

    checkEmptyList () ;
    saveToLocalStorage();
    
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;

        const parentNode = event.target.closest('.list-group-item');

        const id = Number(parentNode.id);

        const task = tasks.find((task => task.id === id));

        task.done = !task.done

        console.log(task)
        const taskTitle = parentNode.querySelector('.task-title');

        taskTitle.classList.toggle('task-title--done');

        saveToLocalStorage()
} 

function checkEmptyList () {
    if(tasks.length === 0) {
        const emptyListElement = `
        <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
                
                tasksList.insertAdjacentHTML('afterbegin', emptyListElement);    
    } 

    if(tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null
    }
}



function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}








 
