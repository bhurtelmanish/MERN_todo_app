import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { IoSearch } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import Alert from "../components/Alert";

const Todos = () => {
  const [todoForm, setTodoForm] = useState(false);
  const [todoButtonValue, setTodoButtonValue] = useState("Add Todo");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [originalTodos, setOriginalTodos] = useState([]);
  const [searchErrorText , setSearchErrorText] = useState("");

  const navigate = useNavigate();

  const protectTodoPage = async () => {
    const token = localStorage.getItem("token");
    // const userId = localStorage.getItem("userId");
    if (!token) {
      console.log("No tokens are here");
      navigate("/login");
    } else {
      try {
        const response = await fetch(`https://mern-todo-app-delta-sable.vercel.app/pages/todos`, {
          method: "GET",
          headers: {
            "Authorization": token, 
          }
        });
        const data = await response.json();
        setTodos(data.allTodos);
        setOriginalTodos(data.allTodos);
        if (data.status === 201) {
          console.log(data.msg);
        } else if (data.status === 400 || data.status === 411) {
          navigate("/login");
          console.log(data.msg);
        }
      } catch (error) {
        console.error("Error checking token:", error);
        navigate("/login");
        console.log(data.msg);
      }
    }
  };
  
  useEffect(() => {
    protectTodoPage();
    const intervalId = setInterval(protectTodoPage, 30000);
    return () => clearInterval(intervalId);
  }, [navigate]);
  


  const addTodoClicked = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if(!token) console.log("No tokens found")
    if(!userId) console.log("No userId found")
  
    const todoData = {title: title, description: description, completed: false , userId: userId};
  
    try {
      const response = await fetch(`https://mern-todo-app-delta-sable.vercel.app/pages/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, 
        },
        body: JSON.stringify(todoData),
      });
      const result = await response.json();
      setTitle("");
      setDescription("");
      if (result.status === 200) {
        alertState(true, "Todo successfully added", "success-alert alert");
        setTimeout(() => {
          setTodoForm(false);
          // window.location.reload();
          // navigate("/todos");
          window.location.href = "/todos";
        }, 400);
      } else if (result.status === 500) {
        alertState(true, "Cannot put data in the database", "danger-alert alert");
      }
    } catch (error) {
      console.error("Error posting todo data:", error);
      alertState(true, "Error posting todo data", "danger-alert alert");
    }
  };
  



  const deleteRequest = async (id) => {
    const response = await fetch(`https://mern-todo-app-delta-sable.vercel.app/pages/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.status == 200) {
      alertState(true, "Todo Deleted Successfully", "success-alert alert");
      setTimeout(() => {
        // window.location.reload();
        // navigate("/todos");
        window.location.href = "/todos";
      }, 500);
    }
  };

  const createNewTodo = () => {
    setTodoForm(true);
  };
  const alertState = (state, message, className) => {
    setShowAlert(state);
    setAlertMessage(message);
    setAlertClass(className);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  const cancelButtonClicked = () => {
    setTodoForm(false);
  };

  const searchFilter = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    if (searchValue === "") {
      setTodos(originalTodos); // Reset to original todos when search is empty
      setSearchErrorText(""); // Clear any error message
    } else {
      const filteredTodos = originalTodos.filter((todo) => {
        return (
          todo.title.toLowerCase().includes(searchValue) ||
          todo.description.toLowerCase().includes(searchValue)
        );
      });
      if (filteredTodos.length === 0) {
        setTodos([]); // Clear todos when no filtered todos found
        setSearchErrorText("Cannot find any todos");
      } else {
        setTodos(filteredTodos);
        setSearchErrorText(""); // Clear any error message
      }
    }
  };
  
  
  

  return (
    <>
      <div className="todo-container">
        <div className="max-todo">
          {showAlert && (
            <Alert alertMessage={alertMessage} alertType={alertClass} />
          )}
          <div className="todo-contents">
            <header>
              Create a <span className="gradient1">Todo</span> Now{" "}
              <span className="emoji">😍😁😁</span>
            </header>
          </div>
          <div className="todo-upper-section">
            <Button
              buttonClass="add-todo-button"
              buttonValue="+"
              onClick={createNewTodo}
            />
            <div className="search-container">
              <IoSearch className="search-icon" />
              <input
                type="search"
                className="search-todo"
                placeholder="Search your todos"
                onInput={searchFilter}
              />
            </div>
          </div>
          {todoForm && (
            <div className="modal-overlay">
              <Form
                buttonValue={todoButtonValue}
                addTodoClicked={addTodoClicked}
                cancelClicked={cancelButtonClicked}
                changeInTitle={(e) => setTitle(e.target.value)}
                changeInDescription={(e) => setDescription(e.target.value)}
              />
            </div>
          )}
          <div className="all-todos-container">
            {todos.length == 0 && !searchErrorText && (
              <div className="error-message">No todos Here </div>
              )}
            {searchErrorText && (
              <div className="error-message">{searchErrorText}</div>
              )}
            {todos.map((todo) => (
              <div className="todo" key={todo._id}>
                {/* Todo item content */}
                <div className="todo-header-section">
                  <header className="todo-header">{todo.title}</header>
                  <div className="todo-operation-container">
                    <FaXmark
                      className="delete-todo"
                      onClick={() => deleteRequest(todo._id)}
                    />
                  </div>
                </div>
                <span className="todo-information">{todo.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
