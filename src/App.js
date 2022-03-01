import React, { useEffect } from "react";
import {FaGithub} from 'react-icons/fa'
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import Alert from "./Alert";
import { useGlobalContext } from "./context";
import Colors from "./Colors";
import DarkModeToggle from './DarkModeToggle';

const App = () => {
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
  } = useGlobalContext();

  const addTask = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Invalid Task Name!");
    } else if (name && isEditing) {
      setTasks(
        tasks.map((task) => {
          return task.id === editId ? { ...task, name: name } : task;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
      showAlert(true, "Task Edited.");
    } else {
      const newTask = {
        id: uuid().slice(0, 8),
        name: name,
        completed: false,
        color: "#009688",
      };
      setTasks([...tasks, newTask]);
      showAlert(true, "Task Added.");
      setName("");
    }
  };

  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  const deleteAll = () => {
    setTasks([]);
    showAlert(true, "Your list is clear!");
  };

  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  const hideColorsContainer = (e) => {
    //   body.
    if (e.target.classList.contains("btn-colors")) return;
    setIsColorsOpen(false);
  };

  return (
  <>
    <div className='container' onClick={hideColorsContainer}>
      {isColorsOpen && <Colors />}
      {alert && <Alert msg={alert.msg} />}
      <form className='head' onSubmit={addTask}>
        <input
          type='text'
          ref={inputRef}
          placeholder='New Task'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>{isEditing ? "Edit" : "Add"}</button>
      </form>
      <div className='filter'>
        <button
          data-filter='all'
          className={filter === "all" ? "active" : ""}
          onClick={filterTasks}
        >
          All
        </button>
        <button
          data-filter='completed'
          className={filter === "completed" ? "active" : ""}
          onClick={filterTasks}
        >
          Completed
        </button>
        <button
          data-filter='uncompleted'
          className={filter === "uncompleted" ? "active" : ""}
          onClick={filterTasks}
        >
          Uncompleted
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {tasks.length > 0 ? (
          <List />
        ) : (
          <p className='no-tasks'>Your list is clear!</p>
        )}
      </DragDropContext>
      {tasks.length > 2 && (
        <button
          className='btn-delete-all'
          onClick={deleteAll}
          title='Delete All Tasks (Completed and Uncompleted)!'
        >
          Clear All
        </button>
      )}
	  <DarkModeToggle/>
	  
    </div>
	<div class="footer">
		<a href='https://github.com/ilyasbelaoud' target='_blank' rel="noopener noreferrer"><FaGithub className='github'/></a>
	</div>
	</>
  );
};

export default App;
