import React, { useState } from 'react'

const List = React.memo(({
  id, 
  data, 
  completed, 
  provided,
  todoData,
  setTodoData,
  snapshot,
  handleClick  
}) => {

  console.log('List reRendering...');


  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((element) => {
      if(element.id === id) {
        element.completed = !element.completed;
      }
      return element;
    });
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }
    
  
  const handleEditChange = (e) => {
    setEditedData( e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodoData = todoData.map((element) => {
      if(element.id === id){
        element.data = editedData;
      }
      return element;
    });
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
    setIsEditing(false);
  } 

  if(isEditing){
    return(
      <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded bg-gray-100" >
         <div className='items-center'>
          <form onSubmit={handleSubmit}>
            <input className='w-full px-3 py-2 mr-4 text-gray-500 rounded' type="text" value={editedData}
              onChange={handleEditChange}
            />
          </form>
         </div>
  
         <div>
          <button className='px-4 py-2 float-right' onClick={() => setIsEditing(false)}>x</button>
         </div>
         <button className='px-4 py-2 float-right' type='submit' onClick={handleSubmit}>save</button>
      </div>
    )
  } else {
    return (
      <div  key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
        className={`${snapshot.isDragging? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`} >
         <div className='items-center'>
          <input className='mr-4' type="checkbox"
            defaultChecked={false}
            onChange={() => handleCompleteChange(id)}/>
          <span className={completed ? 'line-through': undefined}>{data}</span>
         </div>
  
         <div>
          <button className='px-4 py-2 float-right' onClick={() => handleClick(id)}>x</button>
         </div>
         <button className='px-4 py-2 float-right' onClick={() => setIsEditing(true)}>edit</button>
      </div>
    )
  }

  
});

export default List
