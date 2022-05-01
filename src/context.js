import React, { useState, useContext, useRef } from "react";

const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(getTasks());
  const [alert, setAlert] = useState({ show: false, msg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  const [location, setLocation] = useState({});
  const refContainer = useRef(null);

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showAlert(true, "Task Removed.");
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    showAlert(true, "Task State Changed.");
  };

  const editTask = (id) => {
    const { name } = tasks.find((task) => task.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(name);
    inputRef.current.focus();
  };

  const showAlert = (show, msg) => {
    setAlert({ show, msg });
  };

  const showColors = (e, id) => {
    const { top, right } = e.target.getBoundingClientRect();
    setLocation({ top, right, id });
    setIsColorsOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        removeTask,
        toggleDone,
        refContainer,
        alert,
        showAlert,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        editTask,
        name,
        setName,
        getTasks,
        filter,
        setFilter,
        inputRef,
        location,
        setLocation,
        isColorsOpen,
        setIsColorsOpen,
        showColors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
