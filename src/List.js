import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "./context";
import Task from "./Task";

const List = () => {
  const { tasks, filter } = useGlobalContext();  // Destructure tasks and filter from the global context

  let filtered = [...tasks];  // Create a copy of tasks to be filtered

  // Switch statement to filter tasks based on the selected filter
  switch (filter) {
    case "all":
      filtered = [...tasks];  // Show all tasks
      break;
    case "completed":
      filtered = tasks.filter((task) => task.completed);  // Show only completed tasks
      break;
    case "uncompleted":
      filtered = tasks.filter((task) => !task.completed);  // Show only uncompleted tasks
      break;
    default:
      filtered = [...tasks];  // Default to showing all tasks
      break;
  }

  return (
    <Droppable droppableId='droppable-1'>
      { (provided, snapshot) => (
        <ul
          className='tasks-wrapper'
          ref={ provided.innerRef } // Reference to the list element
          { ...provided.droppableProps }  // Spread droppableProps onto the list element
        >
          { filtered.map((task, i) => (
            <Task key={ task.id } { ...task } index={ i } />
          )) }
          { provided.placeholder }
        </ul>
      ) }
    </Droppable>
  );
};

export default List;
