import ClearButton from '../Components/clearbutton.js'

export default function footer({todos, changeFilter, clear, filter}){
    const clearCompleted = () => {
        clear(todos.filter(todo => {return todo.stat === "active";}));
    }
    if(todos.length){
        return(
            <footer className="todo-app__footer">
                <div className="todo-app__total">{todos.filter(todo => {return todo.stat === "active";}).length} left</div>
                <ul className="todo-app__view-buttons">
                    <button className={filter === "all" ? "disabled-button" : ""} onClick={() => {changeFilter("all");}}>All</button>
                    <button className={filter === "active" ? "disabled-button" : ""} onClick={() => {changeFilter("active");}}>Active</button>
                    <button className={filter === "completed" ? "disabled-button" : ""} onClick={() => {changeFilter("completed");}}>Completed</button>
                </ul>
                <ClearButton count={todos.filter(todo => {return todo.stat === "completed";}).length} clear={clearCompleted} />
            </footer>
        )
    }
    else  return null;
}