import React from 'react';
import './App.css';
import "./Loginsignup.css";
import "bootstrap/dist/css/bootstrap.css";
import ToDoList from './Todo';
import TodoList from './Todolist';


function App1() {
  
  return (

    <div>
        <TodoList />
        <br/>
       <ToDoList />
     </div>
  );
}
export default App1;
