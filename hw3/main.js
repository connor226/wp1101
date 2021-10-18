const todoList = document.getElementById("todo-list");
const inputbox = document.getElementById("input-box");

let todoCount = 0;

function appendTODO(e) {
    if(e.keyCode !== 13)  return;
    console.log("e.keyCode");
    e.preventDefault();
    const newDetail = inputbox.value;
    inputbox.value = "";
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-app__item");
    const newdiv = document.createElement("div");
    newdiv.classList.add("todo-app__checkbox");
    const newinput = document.createElement("input");  // what is this input for?
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
    if(todoList.childElementCount === 1){
        todoList.style.visibility = "visible";
    }
}

function filterAll() {

}

function filterActive() {

}

function filterCompleted() {

}

function clearCompleted() {

}