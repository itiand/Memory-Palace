import { useState, useRef, useContext } from 'react';
import { PalaceContext } from '../providers/palaceProvider';

const TodoList = () => {
  const {
    tasks, 
    setTasks,
    getChatResponseFromServer,

  } = useContext( PalaceContext );
  
  const [newKeyword, setNewKeyword] = useState('');
  const [showDefinitionInput, setShowDefinitionInput] = useState(false);
  const [newDefinition, setNewDefinition] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const keywordInputRef = useRef(null); // Ref for the keyword input
  const definitionInputRef = useRef(null); // Ref for the definition input

  const handleKeywordChange = (event) => {
    setNewKeyword(event.target.value);
  };

  const handleDefinitionChange = (event) => {
    setNewDefinition(event.target.value);
  };

  const handleToggleDefinition = (e) => {
    e.preventDefault();
    setShowDefinitionInput((prevShowDefinitionInput) => {
      if (!prevShowDefinitionInput) {
        // Schedule the focus to occur after the component rerenders with the input displayed
        setTimeout(() => {
          definitionInputRef.current && definitionInputRef.current.focus();
        }, 0);
      } else {
        keywordInputRef.current && keywordInputRef.current.focus();
      }
      return !prevShowDefinitionInput;
    });
  };

  const addTask = () => {
    if (newKeyword.trim() !== '') {
      let definition = '';

      if (showDefinitionInput) {
        definition = newDefinition.trim();
        if (definition === '') {
          setErrorMessage('Custom definition cannot be empty.');
          return;
        }
      }

      const newTask = {
        id: Date.now(),
        keyword: newKeyword,
        definition,

        option: showDefinitionInput ? 'custom' : 'notDefine',

        // Store the selected option with the task
        DrawDescription: "",
        generatedImage: "",
        NarratorDescription: "",
      };
        
      setTasks([...tasks, newTask]);
      setNewKeyword('');
      setNewDefinition('');
      setShowDefinitionInput(false); // Reset the showDefinitionInput to false
      setErrorMessage('');

      keywordInputRef.current.focus(); // Focus the keyword input again
    } else {
      setErrorMessage('Keyword field must be filled.');
    }
  };


  const handleAddTask = (e) => {
    e.preventDefault()
    addTask();
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevent the default form submission
      addTask();
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
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newKeyword}
          onChange={handleKeywordChange}
          onKeyPress={handleKeyPress}
          ref={keywordInputRef}
          placeholder="Enter a keyword..."
        />
        {showDefinitionInput && (
          <input
            type="text"
            value={newDefinition}
            onChange={handleDefinitionChange}
            onKeyPress={handleKeyPress} // Attach the event listener to the definition input
            ref={definitionInputRef} // Attach the ref
            placeholder="Enter a definition..."
          />
        )}
        
        
        <button
          onClick={handleToggleDefinition}
          className={`btn btn-outline ${
            showDefinitionInput ? 'btn-delete' : 'btn-accent'
          } btn-xs m-3`}
        >
          {showDefinitionInput ? 'Cancel' : 'Definition'}
        </button>
        
        <button onClick={handleAddTask} className="btn btn-outline btn-accent btn-xs m-3">
          +
        </button>
      </div>
      <div style={{ color: 'red' }}>{errorMessage}</div>
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
        <div className="flex items-center space-x-2">
          <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>{index + 1}.</span>
          <strong>{task.keyword}:</strong>
          {task.option === 'define' && <span> will return definition</span>}
          {task.option === 'custom' && <span> {task.definition}</span>}
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="btn btn-outline btn-accent btn-xs m-3"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
    </div>
  );
};

export default TodoList;
