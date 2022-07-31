import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const inputTask = useRef(null);

  const addTask = () => {
    setTodoList([...todoList, { task: currentTask, completed: false }]);
    inputTask.current.value = "";
    setCurrentTask("");
  };

  const deleteTask = (taskToDelete) => {
    setTodoList(todoList.filter((task) => task.task !== taskToDelete));
  };

  const completeTask = (taskToComplete) => {
    setTodoList(
      todoList.map((task) => {
        return task.task === taskToComplete
          ? { task: taskToComplete, completed: true }
          : { task: task.task, completed: task.completed ? true : false };
      })
    );
  };

  return (
    <section className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Task..."
          ref={inputTask}
          onKeyDown={(e) => {
            if (e.keyCode === 13) addTask();
          }}
          onChange={(e) => setCurrentTask(e.target.value)}
        ></input>
        <button onClick={addTask}>Add Task</button>
      </div>
      <hr />
      <ul>
        {todoList.map((val, key) => {
          return (
            <div id="task" key={key}>
              <li>{val.task}</li>
              <button onClick={() => completeTask(val.task)}>Completed</button>
              <button onClick={() => deleteTask(val.task)}>Delete</button>
              {val.completed ? (
                <h2>Task Completed</h2>
              ) : (
                <h2>Task Not Completed</h2>
              )}
            </div>
          );
        })}
      </ul>
    </section>
  );
}

export default App;
