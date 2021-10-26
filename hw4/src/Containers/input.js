import { Component } from "react";

class Input extends Component{
    constructor(props) {
        super(props);
        this.state = {inputValue: "", todoCount: 0};
    }

    handleInput = (e) => {
        if(e.keyCode === 13 && this.state.inputValue){
            this.setState((state) => ({todoCount: state.todoCount + 1}));
            this.props.handleChange([...this.props.todos, {todo: this.state.inputValue, key: this.state.todoCount, stat: "active"}]);
            e.target.value="";
            this.setState({inputValue: ""});
        }
        else{
            this.setState({inputValue: e.target.value});
        }
    }

    render(){
        return (
            <input id="input-box" className="todo-app__input" placeholder="What needs to be done?" onKeyUp={this.handleInput}/>
        )
    }
}

export default Input;