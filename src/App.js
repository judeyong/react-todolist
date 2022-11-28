import React, { useCallback, useState } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : [];

export default function App() {
  console.log('App reRendering...');

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodoData = {
      id: Date.now(),
      data: value,
      completed: false,
    };

    setTodoData(prev => [...prev, newTodoData]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodoData]));
    setValue("");
  }
  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter(data => data.id !== id)
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }, [todoData])

    return(
      <div className="flex items-center justify-center w-screen h-screen bg-blue-100" >
        <div className="w-ful p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg" >
           <div className="flex justify-between mb-3" >
              <h1>할 일 목록</h1>
              <button onClick={handleRemoveClick}>Delete All</button>
           </div>

          <Lists todoData={todoData} setTodoData={setTodoData} handleClick={handleClick}/>

          <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>

        </div>
      </div>
    )
}