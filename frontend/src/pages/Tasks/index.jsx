import React, { useEffect, useState } from 'react'
import './styles.scss'
import { toast } from 'react-toastify';
import axios from 'axios';
import TaskCard from '../../components/Tasks/TaskCard';
import UpdateTask from '../../components/Tasks/UpdateTask';

let id = sessionStorage.getItem("id");
let toUpdateArray = [];

const Task = () => {
  const [inputs, setInputs] = useState({ title: "", note: "", status: "pending"});
  const [arrays, setArrays] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(
      arrays.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.note.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, arrays]);

  const handleInput = (e) => {
    const {name, value} = e.target;
    setInputs({ ...inputs, [name]: value});
    console.log(inputs)
  };

  const handleSubmit = async (e) => {
    if(id) {
      await axios.post(`${window.location.origin}/api/tasks`, {
        title: inputs.title,
        note: inputs.note,
        status: inputs.status,
        id: id
      })
      .then((res) => {
        console.log(res);
      });
      toast.success(`Task ${inputs.title} has been added!`);
      setInputs({ title: "", note: "", status:"pending"});
    } else {
      setArrays([ ...arrays, inputs]);
      console.log(arrays);
      setInputs({ title: "", note: "", status:"pending"});
      toast.success(`Task ${inputs.title} has been added temporary`);
      toast.warn("Your Task is Not Saved! Please Register");
    }
  }

  const displayUpdate = (value) => {
    console.log(value);
    document.getElementById("update-task").style.display = "block";
  };

  const updateTask = (value) => {
    toUpdateArray = arrays[value];
  };

  const completeTask = async (tasks_id) => {
    if(id) {
      await axios.put(`${window.location.origin}/api/tasks/${tasks_id}`, {
        status: "completed"
      })
      .then((res) => {
        toast.success(`Task Completed!`);
        console.log(res.data);
      })
    } else {
      toast.error("Please Register First.");
    }
  }

  const deleteTask = async (tasks_id) => {
    if(id) {
      await axios.delete(`${window.location.origin}/api/tasks/${tasks_id}`, {
        data: {id: id},
      })
      .then((res) => {
        toast.info(`Task has been removed`);
        console.log(res.data);
      })
    } else {
      toast.error("Please Register First.");
    }
  }

  useEffect(() => {
    if(id) {
      const fetch = async () => {
        await axios.get(`${window.location.origin}/api/tasks/${id}`)
        .then((res) => {
          setArrays(res.data.tasks || []);
        });
      };
      fetch();
    }
  }, [handleSubmit]);

  return (
  <section className='task-section'>
    {/*WRITE TASK SECTION */}
    <section className='task py-5'>
      <div className="task-main container">
        <form className="task-note ">
          <input 
            type="text" 
            placeholder='Task Title' 
            name="title" value={inputs.title} required
            onChange={handleInput}
            className='my-2 px-3 py-3 task-note-input'
          />
          <textarea 
            type="text" 
            placeholder='Write your task here...' 
            name="note" rows="3" value={inputs.note} required
            onChange={handleInput}
            className='my-2 px-3 py-3 task-note-input'
          />
          <button onClick={handleSubmit} type="submit" className='btn btn-app my-2'>Add Task!</button>
        </form>
      </div>
    </section>

    {/*SEARCH TASK SECTION */}
    <section className='search-task'>
        <div className="search-main container">
          <input
            type="text"
            placeholder='Search Tasks...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='py-3 search-input'
          />
        </div>
      </section>

    {/*TASK LISK SECTION */}
    <section className="task-list-section container py-5">
      <h2>User Tasks</h2>
      <div className="task-list-container my-5">
        <div className="task-list">
        {(searchTerm === "" ? arrays : filteredTasks).map((par, index) => (
          <div key={index}>
            <TaskCard
              id={par._id}
              title={par.title}
              note={par.note}
              status={par.status}
              update_id={index}
              delete_id={deleteTask}
              display={displayUpdate}
              toUpdate={updateTask}
              toComplete={completeTask}
            />
          </div>
        ))}
        <UpdateTask id='update-task' isLoggedin={id} update={toUpdateArray}/>
        </div>
      </div>
    </section>
  </section>
  )
}

export default Task