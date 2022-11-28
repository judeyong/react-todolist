//class 형태의 todolist.
import React, { Component } from "react";
import "./App.css";


export default class App extends Component {
  
  state = {
    todoData : [],
    value:"",
  };
  
  btnStyle = {
    color: "black",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    }
  }

  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(data => data.id !== id)
      this.setState({todoData:newTodoData});
  }

  handleChange = (e) => {
    this.setState({ value:e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let newTodoData = {
      id: Date.now(),
      data: this.state.value,
      completed: false,
    };

    this.setState({ todoData:[...this.state.todoData, newTodoData], value:"" });
    
  }
  
  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map((element) => {
      if(element.id === id) {
        element.completed = !element.completed;
      }
      return element;
    });

    this.setState({ todoData: newTodoData});
  }

  render(){
    return(
      <div className="container">
        <div className="todoBlock">
           <div className="title">
              <h1>할 일 목록</h1>
           </div>
           {this.state.todoData.map((element) => 
              <div style={this.getStyle(element.completed)} key={element.id}>
                  <input type="checkbox"
                    defaultChecked={false}
                    onChange={() => this.handleCompleteChange(element.id)}/>
                    {element.data}
                  <button style={this.btnStyle} onClick={() => this.handleClick(element.id)}>x</button>
              </div>
           )}

          <form style={ { display: 'flex' }} onSubmit={this.handleSubmit}>
            <input 
              type="text"
              name="value" 
              placeholder="할 일을 입력하세요." 
              value={this.state.value}
              onChange={this.handleChange}
              style={{ flex: '10', padding: '5px'}} />
            <input 
              type="submit" 
              value="입력" 
              className="btn" 
              style={{ flex: '1' }} />
          </form>

        </div>
      </div>
    )
  }

}