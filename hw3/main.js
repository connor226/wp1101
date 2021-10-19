const todoList = document.getElementById("todo-list");
const inputbox = document.getElementById("input-box");
const counter = document.getElementById("todo-counter");
const footer = document.getElementById("todo-footer");
const clearbutton = document.getElementById("clear-button");

let todoCount = 0;
let nodelist = [];

function appendTODO(e) {
    if(e.keyCode !== 13)  return;
    e.preventDefault();
    const newDetail = inputbox.value;
    if(!newDetail)  return;
    inputbox.value = "";
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-app__item");
    const newdiv = document.createElement("div");
    newdiv.classList.add("todo-app__checkbox");
    const newinput = document.createElement("input");
    const newlabel = document.createElement("label");
    newinput.type = "checkbox";
    newinput.id = todoCount;
    newlabel.for = todoCount;
    newdiv.appendChild(newinput);
    newdiv.appendChild(newlabel);
    const newh1 = document.createElement("h1");
    newh1.innerText = newDetail;
    newh1.classList.add("todo-app__item-detail");
    const newimg = document.createElement("img");
    newimg.src = "./img/x.png";
    newimg.classList.add("todo-app__item-x");
    newTodo.appendChild(newdiv);
    newTodo.appendChild(newh1);
    newTodo.appendChild(newimg);
    todoList.appendChild(newTodo);
    nodelist.push(newTodo);
    newdiv.addEventListener("click", () => {
        newinput.checked ^= 1;
        if(newinput.checked){
            newh1.style.textDecoration = "line-through";
            newh1.style.opacity = 0.5;
        }
        else{
            newh1.style.textDecoration = "None";
            newh1.style.opacity = 1;
        }
        if(nodelist.filter(node => {return (node.firstElementChild.firstElementChild.checked)}).length){
            clearbutton.style.visibility = "visible";
        }
        else{
            clearbutton.style.visibility = "hidden";
        }
        counter.innerText = `${nodelist.filter(node => {return (!node.firstElementChild.firstElementChild.checked)}).length} left`;
    })
    newimg.addEventListener("click", () => {
        todoList.removeChild(newTodo);
        nodelist = nodelist.filter(node => {
            return (node !== newTodo);
        });
        if(!newinput.checked){
            counter.innerText = `${nodelist.filter(node => {return (!node.firstElementChild.firstElementChild.checked)}).length} left`;
        }
        if(todoList.childElementCount === 0){
            todoList.style.visibility = "hidden";
            footer.style.visibility = "hidden";
        }
        if(!nodelist.filter(node => {return node.firstElementChild.firstElementChild.checked}))  clearbutton.style.visibility = "hidden";
    })
    if(todoList.childElementCount){
        todoList.style.visibility = "visible";
        footer.style.visibility = "visible";
    }
    counter.innerText = `${nodelist.filter(node => {return (!node.firstElementChild.firstElementChild.checked)}).length} left`;
}

function filterAll() {
    while(todoList.childElementCount){
        todoList.firstElementChild.remove();
    }
    nodelist.forEach(node => {
        todoList.appendChild(node);
    })
}

function filterActive() {
    while(todoList.childElementCount){
        todoList.firstElementChild.remove();
    }
    nodelist.forEach(node => {
        if(!node.firstElementChild.firstElementChild.checked)  todoList.appendChild(node);
    })
}

function filterCompleted() {
    while(todoList.childElementCount){
        todoList.firstElementChild.remove();
    }
    nodelist.forEach(node => {
        if(node.firstElementChild.firstElementChild.checked)  todoList.appendChild(node);
    })
}

function clearCompleted() {
    nodelist = nodelist.filter(node => {
        return (!node.firstElementChild.firstElementChild.checked);
    })
    counter.innerText = `${nodelist.filter(node => {return (!node.firstElementChild.firstElementChild.checked)}).length} left`;
    clearbutton.style.visibility = "hidden";
    filterAll();
    if(todoList.childElementCount === 0){
        todoList.style.visibility = "hidden";
        footer.style.visibility = "hidden";
    }
}