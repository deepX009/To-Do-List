import React, { useState, useEffect } from 'react';
import './Loginsignup.css';

const TodoList = () => {
    const [newTask, setNewTask] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await fetch('http://localhost:5005/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask }),
      });
      setNewTask('');
    
    } catch (error) {
      console.error('Error adding to-do item:', error);
    }
  }

  return (
    <div className='to-do-list'>
      <h2>To-Do List</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      </div>
  );
};

export default TodoList;