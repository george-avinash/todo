import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [allTodos, setAllTodos] = useState([]);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const [newDescription, setNewDescription] = useState("");

  const [completedTodos, setCompletedTodos] = useState([]);

  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const handleAddNewTodo = () => {
    let newTodoObj = {
      title: newTodoTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoObj);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewDescription("");
    setNewTodoTitle("");
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodos) {
      setAllTodos(savedTodos);
    }
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);

  const handleTodoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index);

    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let hh = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + "at" + hh + ":" + min + ":" + sec;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos, filteredItem];
    console.log(updatedCompletedArr);
    setCompletedTodos(updatedCompletedArr);
    handleTodoDelete(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));

    handleTodoDelete(index);
  };

  return (
    <div className="App">
      <h1>My Todo</h1>
      <br />
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={newTodoTitle}
              onChange={ e => setNewTodoTitle(e.target.value)}
              placeholder="What is the Task Title?"
            />
          </div>
          <div className="todo-input-item">
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="What is the description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddNewTodo}
              className="primaryBtn"
            >
              Add task
            </button>
          </div>
        </div>
        <div>
          <div className="btn-area">
            <button
              className={`secondaryBtn ${
                isCompletedScreen === false && "active"
              }`}
              onClick={() => setIsCompletedScreen(false)}
            >
              Pending
            </button>
            <button
              className={`secondaryBtn ${
                isCompletedScreen === true && "active"
              }`}
              onClick={() => setIsCompletedScreen(true)}
            >
              Completed
            </button>
            
          </div>
          <div className="todo-list">
            {isCompletedScreen === false &&
              allTodos.map((item, index) => (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p> {item.description} </p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        onClick={() => handleTodoDelete(index)}
                        className="icon"
                      />
                      <BsCheckLg
                        onClick={() => handleComplete(index)}
                        className="check-icon"
                      />
                    </div>
                  </div>
              ))}
              
            {isCompletedScreen === true &&
              completedTodos.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p> {item.description} </p>
                      <p>
                        <small>Completed on: {item.completedOn}</small>
                      </p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        onClick={() => handleCompletedTodoDelete(index)}
                        className="icon"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
