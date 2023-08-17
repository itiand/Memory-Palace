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
    savePalaceState,
  } = useContext(PalaceContext);

  const [newKeyword, setNewKeyword] = useState('');
  const [showDefinitionInput, setShowDefinitionInput] = useState(false);
  const [newDefinition, setNewDefinition] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [generating, setGenerating] = useState(false);

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
        symbol: "",
        symbolExplanation: "",
        drawDescription: "",
        option: showDefinitionInput ? 'custom' : 'notDefine',
        generatedImage: "",
        narratorDescription: "",
        x: 6,
        y: 94,
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
    setGenerating(true)
    // const content = `${keyword}: ${definition} - For a memory palace. Give me a simple and tangible noun, that's easy to draw, to help me remember ${keyword}. Do not over explain, do not correct. Just follow the format no matter what. Reply with one word, do not include a period.`;
    // user inputs keyword and their best guess of the definition, chat gpt will return a good definition.
    const content = `Keyword = ${keyword}, Context = ${definition} - Use the context to provide a simple brief clear explanation of the keyword. Keep the new definition to less than one sentence. Provide a metaphor/symbol that best represents this concept. The symbol/metaphor should be a singlular concrete noun without any abstraction that best respresents the original keyword. Explain your metaphor briefly in 6 wors or less and return it under symbolExplanation. If the keyword is already a concrete noun, return the original keyword. If you plan on returning a symbol that is the same category as the original keyword, or if the symbol and symbol explanation are less known/recognizeable/cool, just return the original keyword, and original definition under "symbolic concrete noun" and "symbol explanation". If no context is provided, define it yourself. If you intent to return "n/a", or "N/A", then just return an empty javascript string "". Return in the format of: ["keyword", "new better definition", "symbolic concrete noun", "symbol explanation"].`;
  

    const response = await getChatResponseFromServer(content); //response = get chat gpt to give a symbol 
    console.log(response);
    const newResponse = JSON.parse(response);
    const addGptArray = (newResponse) => {
      console.log(newResponse);
      // let newestResponse = [];

      const newestResponse = newResponse.map(response => {
        console.log('response', response);
        if (response === 'n/a' || response === "N/A") {
          return("");
        } else {
          return response;
        }
      });
      
      tasks.definition = newestResponse[1];
      tasks.symbol = newestResponse[2];
      tasks.symbolExplanation = newestResponse[3];
      selectedRoom[tasks._id] = tasks;
      savePalaceState();
    };

    addGptArray(newResponse);
   
    // make tasks === selectedRoom
    const responseWithAction = await randomOddState(newResponse[3]);  //attach a action --> anthony's method


    // store into tasks
    const imageUrl = await getImageResponseFromServer(`${newResponse[0]} ${responseWithAction}`);
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
    await setGenerating(false);
    addGptArray();
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
                Draw
              </button>

              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btn btn-outline btn-error btn-xs m-3"
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
      {generating === true && 
      <button type="button" disabled>
        Generating Image...
      <span className="loading loading-spinner text-info"></span>
      </button>}
    </div>
  );
};

export default TodoList;
