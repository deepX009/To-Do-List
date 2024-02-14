import React, { useState, useEffect } from 'react';
import './Loginsignup.css';

const ToDoList = () => {
  const [toDolist, setToDolist] = useState([]);
  const [updatedToDoItem, setUpdatedToDoItem] = useState({
    _id: '',
    task: '',
    completed: '',
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const prevtoDolistRef = React.useRef();

  useEffect(() => {
    prevtoDolistRef.current = toDolist;
  }, [toDolist]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchToDoItems();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchToDoItems = async () => {
    try {
      const response = await fetch('http://localhost:5005/todos');
      if (response.ok) {
        const toDoData = await response.json();
        setToDolist(toDoData);
      } else {
        console.error('Failed to fetch to-do items. Server responded with:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while fetching to-do items:', error.message);
    }
  };

  const handleUpdate = (itemId) => {
    setEditingItemId(itemId);
    const todoToUpdate = toDolist.find(todo => todo._id === itemId);
    if (todoToUpdate) {
      setUpdatedToDoItem({
        _id: itemId,
        task: todoToUpdate.task,
        completed: todoToUpdate.completed,
      });
      setShowUpdateForm(true);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5005/todos/${updatedToDoItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedToDoItem), 
      });

      if (response.ok) {
        fetchToDoItems();
        setShowUpdateForm(false);
        setEditingItemId(null);
        console.log('To-Do item updated successfully');
      } else {
        console.error('Failed to update to-do item. Server responded with:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while updating to-do item:', error.message);
    }
  };

  const handleCancel = () => {
    setShowUpdateForm(false);
    setEditingItemId(null);
  };

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this to-do item?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5005/todos/${itemId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchToDoItems();
          console.log('To-Do item deleted successfully');
        } else {
          console.error('Failed to delete to-do item. Server responded with:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while deleting to-do item:', error.message);
      }
    }
  };

  return (
    <div className='to-do-list'>
        <h1>todo data</h1>
        <table className='tables'>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {toDolist.map((toDoItem, index) => (
          <tr key={toDoItem._id}>
            <td>{index + 1}</td>
            <td>
              {editingItemId === toDoItem._id ? (
                <input type="text" value={updatedToDoItem.task} onChange={(e) => setUpdatedToDoItem({ ...updatedToDoItem, task: e.target.value })} />
              ) : (
                <>
                  {toDoItem.completed ? <del>{toDoItem.task}</del> : toDoItem.task}
                </>
              )}
            </td>
            <td>
              {editingItemId === toDoItem._id ? (
                <>
                  <button onClick={handleUpdateSubmit}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleUpdate(toDoItem._id)}>Update</button>
                  <button onClick={() => handleDelete(toDoItem._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
