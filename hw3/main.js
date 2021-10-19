const todoList = document.getElementById("todo-list");
const inputbox = document.getElementById("input-box");
const counter = document.getElementById("todo-counter");
const footer = document.getElementById("todo-footer");

let todoCount = 0;
let unfinishTask = 0;

function appendTODO(e) {
    if(e.keyCode !== 13)  return;
    unfinishTask += 1;
    e.preventDefault();
    const newDetail = inputbox.value;
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
    newdiv.addEventListener("click", () => {
        newinput.checked ^= 1;
        if(newinput.checked){
            newh1.style.textDecoration = "line-through";
            newh1.style.opacity = 0.5;
            unfinishTask -= 1;
        }
        else{
            newh1.style.textDecoration = "None";
            newh1.style.opacity = 1;
            unfinishTask += 1;
        }
        counter.innerText = `${unfinishTask} left`;
    })
    newimg.addEventListener("click", () => {  // TODO: hide footer when ul is empty
        todoList.removeChild(newTodo);
        if(!newinput.checked){
            unfinishTask -= 1;
            counter.innerText = `${unfinishTask} left`;
        }
        if(todoList.childElementCount === 0){
            todoList.style.visibility = "hidden";
            footer.style.visibility = "hidden";
        }
    })
    if(todoList.childElementCount === 1){
        todoList.style.visibility = "visible";
        footer.style.visibility = "visible";
    }
    counter.innerText = `${unfinishTask} left`;
}

function filterAll() {

}

function filterActive() {

}

function filterCompleted() {

}

function clearCompleted() {

}