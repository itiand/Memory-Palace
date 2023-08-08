import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleKeywordChange = (event) => {
    setNewKeyword(event.target.value);
  };

  const handleDefinitionChange = (event) => {
    setNewDefinition(event.target.value);
  };

  const handleAddTask = () => {
    if (newKeyword.trim() !== '' && newDefinition.trim() !== '') {
      const newTask = { id: Date.now(), keyword: newKeyword, definition: newDefinition };
      setTasks([...tasks, newTask]);
      setNewKeyword('');
      setNewDefinition('');
      setErrorMessage('');
    } else {
      setErrorMessage('Both fields must be filled.');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleSortStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleSortOver = (e, id) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text');
    const draggedIndex = tasks.findIndex((task) => task.id === Number(draggedId));
    const targetIndex = tasks.findIndex((task) => task.id === Number(id));
    if (draggedIndex !== targetIndex) {
      const updatedTasks = [...tasks];
      const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(targetIndex, 0, draggedTask);
      setTasks(updatedTasks);
    }
  };

  const handleSortEnd = () => {
    // Add any logic after the item has been sorted (if needed)
  };

  return (
    <div>
      <h2>Memory List</h2>
      <div>
        <input
          type="text"
          value={newKeyword}
          onChange={handleKeywordChange}
          placeholder="Enter a keyword..."
        />
        <input
          type="text"
          value={newDefinition}
          onChange={handleDefinitionChange}
          placeholder="Enter a definition..."
        />
        <button onClick={handleAddTask} className="btn btn-outline btn-accent btn-xs m-3">Add Memory</button>
        <div style={{ color: 'red' }}>{errorMessage}</div>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            draggable
            onDragStart={(e) => handleSortStart(e, task.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleSortOver(e, task.id)}
            onDragEnd={handleSortEnd}
          >
            <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>{index + 1}.</span>
            <strong>{task.keyword}:</strong> {task.definition}
            <button onClick={() => handleDeleteTask(task.id)} className="btn btn-outline btn-accent btn-xs m-3">Delete</button>
          </li>
        ))}
      </ul>
      <div style={{ fontStyle: 'italic' }}>
        <span role="img" aria-label="reorganize">✋</span> Drag and drop to reorganize the list.
      </div>
    </div>
  );
};

export default TodoList;