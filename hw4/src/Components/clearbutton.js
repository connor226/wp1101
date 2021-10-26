export default function ClearButton({count, clear}){
    if(!count){
        return (
            <div className="todo-app__clean">
                <button className="hidden-button">Clear completed</button>
            </div>
        );
    }
    return(
        <div className="todo-app__clean">
            <button onClick={clear}>Clear completed</button>
        </div>
    )
}