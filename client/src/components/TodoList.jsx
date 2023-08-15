import { useState, useRef, useContext } from 'react';
import { PalaceContext } from '../providers/palaceProvider';
import { v4 as uuidv4 } from 'uuid';

const TodoList = ({ randomOddState, isEditRoomMode, setIsEditRoomMode }) => {
  const {
    tasks,
    setTasks,
    getChatResponseFromServer,
    getImageResponseFromServer,
    selectedRoom,
  } = useContext(PalaceContext);

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
        id: uuidv4(),
        keyword: newKeyword,
        definition,
        option: showDefinitionInput ? 'custom' : 'notDefine',
        drawDescription: "",
        generatedImage: "",
        narratorDescription: "",
        x: 2,
        y: 2,
        isDragging: false, 
        }
      

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
    e.preventDefault();
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


  const handleGenerate = async (e, keyword, definition) => {
    e.preventDefault();
    const content = `${keyword}: ${definition} - For a memory palace. Give me a simple and tangible noun, that's easy to draw, to help me remember ${keyword}. Do not over explain, do not correct. Just follow the format no matter what. Reply with one word, do not include a period.`;

    const response = await getChatResponseFromServer(content); //response = get chat gpt to give a symbol 
    console.log(response);
    const responseWithAction = await randomOddState(response);  //attach a action --> anthony's method
    const imageUrl = await getImageResponseFromServer(responseWithAction);
    console.log('IMAGEURL', imageUrl);
    const updatedTasks = tasks.map(task => {
      if (task.keyword === keyword) {
        return {
          ...task,
          drawDescription: responseWithAction,
          generatedImage: imageUrl
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };


  return (
    <div className='py-4'>
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
          className={`btn btn-outline ${showDefinitionInput ? 'btn-delete' : 'btn-accent'
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
            <div className="flex text-sm items-center space-x-2 mb-2">
              <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>{index + 1}.</span>
              <strong>{task.keyword}:</strong>
              {task.option === 'define' && <span> will return definition</span>}
              {task.option === 'custom' && <span> {task.definition}</span>}
              {task.drawDescription && <span className="text-green-800"><em>{task.drawDescription}</em></span>}
              {task.generatedImage && <img className="w-40 border-2 border-neutral-500 rounded-lg" src={task.generatedImage}></img>}
              < button className="btn btn-outline btn-accent btn-xs m-3" onClick={(e) => { handleGenerate(e, task.keyword, task.definition); }}>
                generate
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btn btn-outline btn-error btn-xs m-3"
              >
                -
              </button>
            </div>

            {/* <div className="flex text-sm items-center space-x-2 mb-2">
  {selectedRoom.ToDoList.length > 0 ? (
    <>
      <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>{index + 1}.</span>
      <strong>{task.keyword}:</strong>
      {task.option === 'define' && <span> will return definition</span>}
      {task.option === 'custom' && <span> {task.definition}</span>}
      {task.drawDescription && <span className="text-green-800"><em>{task.drawDescription}</em></span>}
      {task.generatedImage && <img className="w-40 border-2 border-neutral-500 rounded-lg" src={task.generatedImage}></img>}
      <button className="btn btn-outline btn-accent btn-xs m-3" onClick={(e) => { handleGenerate(e, task.keyword, task.definition); }}>
        generate
      </button>
      <button onClick={() => handleDeleteTask(task.id)} className="btn btn-outline btn-error btn-xs m-3">
        -
      </button>
    </>
  ) : (
    <>
      <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>{index + 1}.</span>
      <strong>{selectedRoom.ToDoList.keyword}:</strong>
      {selectedRoom.ToDoList.option === 'define' && <span> will return definition</span>}
      {selectedRoom.ToDoList.option === 'custom' && <span> {selectedRoom.ToDoList.definition}</span>}
      {selectedRoom.ToDoList.drawDescription && <span className="text-green-800"><em>{selectedRoom.ToDoList.drawDescription}</em></span>}
      {selectedRoom.ToDoList.generatedImage && <img className="w-40 border-2 border-neutral-500 rounded-lg" src={selectedRoom.ToDoList.generatedImage}></img>}
      <button className="btn btn-outline btn-accent btn-xs m-3" onClick={(e) => { handleGenerate(e, selectedRoom.ToDoList.keyword, selectedRoom.ToDoList.definition); }}>
        generate
      </button>
      <button onClick={() => handleDeleteTask(selectedRoom.ToDoList._id)} className="btn btn-outline btn-error btn-xs m-3">
        -
      </button>
    </>
  )}
</div> */}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
