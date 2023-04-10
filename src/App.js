import React, { useState, useEffect } from 'react'
import List from './components/List';
import axios from "axios";
import { baseURL } from './components/utils/constant.js';

const App = () => {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null)

  useEffect(() => {
    axios.get(`${baseURL}/get`)
    .then((res) => {
      console.log(res.data)
      setTasks(res.data)
    })
  }, [updateUI])

// set tasks function

  const addTask = () => {
    axios.post(`${baseURL}/save`, {task: input}).then((res) => {
      console.log(res.data);
      setInput("")
      setUpdateUI((prevState) => !prevState)
    })
  }

  const updateMode = (id, text) => {
    setInput(text);
    setUpdateId(id);  
  }


  const updateTask = () =>{
    axios.put(`${baseURL}/update/${updateId}`, {task : input}).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("")
    })

  }
  return (
    <div className='main-container'>
      <h1 className='title'>TASKS APP WITH BACKEND</h1>
      <div className="input-container">
        <input 
        type="text" 
        value= {input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Type a task..'
        autoFocus
        />

        <button type='submit' onClick={ updateId ? updateTask : addTask }>{updateId ? "Update Task" : "Add Task"}</button>
      </div>

      <ul>
        {tasks.map(task => 
          <List 
          key={task._id} 
          id={task._id} 
          task={task.task} 
          setUpdateUI={setUpdateUI} 
          updateMode={updateMode}
          />)}
        
      </ul>
    </div>
  )
}

export default App