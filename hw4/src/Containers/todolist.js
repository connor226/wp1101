import React from 'react'
import Item from '../Components/item'

function TodoList({todos, filter, handleChange}) {
    const deleteItem = (_id) => {
        const newTodos = todos.filter(todo => {return (todo.key !== _id)});
        handleChange(newTodos);
    }
    const toggleStat = (_id) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex(todo => {
            return todo.key === _id;
        })
        newTodos[index].stat = (newTodos[index].stat === "active" ? "completed" : "active");
        handleChange(newTodos);
    }
    if(todos.length){
        return (
            <ul className="todo-app__list" id="todo-list">
            {
                todos.map(detail => {
                    console.log(detail);
                    const {todo, key, stat} = detail;
                    return <Item todo={todo} _id={key} deleteItem={deleteItem} stat={stat} toggleStat={toggleStat}></Item>
                })
            }
         </ul>
        )
    }
    else  return null;
}

export default TodoList;