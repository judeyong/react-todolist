import React from 'react'
//drop and drag 기능.
//react-beautiful-dnd api활용.
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from'./List';


const Lists = React.memo(({todoData, setTodoData, handleClick}) => {

  console.log('Lists reRendering...');

  const handleEnd = (result) => {
    console.log('result', result);

    if(!result.destination) return;

    const newTodoData = todoData;
    // 변경시키는 아이템 배열에서 지움
    // return 값으로 지움 값 받음
    const [reOrderItem] = newTodoData.splice(result.source.index, 1);
    console.log('reOrderItem: ', reOrderItem);

    //원하는 자리에 reOrderItem 을 insert.
    newTodoData.splice(result.destination.index, 0, reOrderItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }
  
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
             {todoData.map((element,idx) => 
               <Draggable key={element.id} draggableId={element.id.toString()} index={idx} >
                 {(provided, snapshot) => (
                    <List
                    key={element.id}
                    id={element.id}
                    data={element.data}
                    completed={element.completed}
                    provided={provided}
                    todoData={todoData}
                    setTodoData={setTodoData}
                    snapshot={snapshot}
                    handleClick={handleClick}
                     />       
                 )}
               </Draggable>
             )}
             {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
});

export default Lists
