import ClearButton from '../Components/clearbutton.js'

export default function footer({todos, changeFilter, clear}){
    const clearCompleted = () => {
        clear(todos.filter(todo => {return todo.stat === "active";}));
    }
    if(todos.length){
        return(
            <footer className="todo-app__footer">
                <div className="todo-app__total">{todos.filter(todo => {return todo.stat === "active";}).length} left</div>
                <ul className="todo-app__view-buttons">
                    <button onClick={() => {changeFilter("all");}}>All</button>
                    <button onClick={() => {changeFilter("active");}}>Active</button>
                    <button onClick={() => {changeFilter("completed");}}>Completed</button>
                </ul>
                <ClearButton count={todos.filter(todo => {return todo.stat === "completed";}).length} clear={clearCompleted} />
            </footer>
        )
    }
    else  return null;
}