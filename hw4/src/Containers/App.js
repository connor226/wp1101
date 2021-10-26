import { useState } from 'react';
import Input from './input';
import TodoList from './todolist';
//import Footer from './footer';

export default function TodoApp(){
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    return(
        <div className="todo-app__root">
            <header className="todo-app__header">
                <h1 className="todo-app__title">todos</h1>
            </header>
            <section className="todo-app__main">
                <Input todos= {todos} handleChange = {setTodos}/>
                <TodoList todos= {todos} filter= {filter} handleChange={setTodos}/>
            </section>
            {//<Footer todos= {todos} filter= {filter} changeFilter= {setFilter}/>
        }</div>
    )
}