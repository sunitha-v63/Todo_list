import React, { useEffect, useState } from "react";

const style={
   display: "flex", 
   alignItems: "center", 
   gap: "10px"
}

function Task() {
  const [task, setTask] = useState("");
  const [addTask, setAdd] = useState([]);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("task")) || [];
    setAdd(storeData);
  }, []);

  const add = () => {
    if (task.trim() !== "") {
      const updatedTasks = [...addTask, task];
      setAdd(updatedTasks);
      localStorage.setItem("task", JSON.stringify(updatedTasks));
      setTask("");
    }
  };

  const remove = (index) => {
    const updatedTasks = addTask.filter((_, i) => i !== index);
    setAdd(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={task}
          placeholder="Enter the text"
          onChange={(e) => setTask(e.target.value)}
        /> &nbsp;
        <button type="button" onClick={add}>
          Add
        </button>
      </form>

      <ul>
        {addTask.map((val, index) => (
          <li key={index} style={style}>
            <p>{val}</p>
            <button onClick={() => remove(index)}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Task;