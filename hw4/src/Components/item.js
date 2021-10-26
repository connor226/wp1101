export default function Item({todo, _id, deleteItem, stat, toggleStat}){
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input type="checkbox" id={_id} checked={stat === "completed"} onClick={() => {toggleStat(_id)}}></input>
                <label htmlFor={_id}></label>
            </div>
            <h1 className={`todo-app__item-detail ${stat}`}>{todo}</h1>
            <img className="todo-app__item-x" src="x.png" alt="X" onClick={() => {deleteItem(_id)}}/>
        </li>
    )
}