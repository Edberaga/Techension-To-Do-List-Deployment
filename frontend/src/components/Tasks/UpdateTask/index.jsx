import React, {useEffect, useState} from 'react'
import './styles.scss'
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateTask = ({id, isLoggedin, update }) => {
  const [inputs, setInputs] = useState({ title: "", note: "", status: "pending" });

  useEffect(() => {
    if (update) {
      setInputs({ title: update.title, note: update.note, status: update.status });
      console.log(update._id);
    }
  }, [update]);

  const handleInput = (e) => {
    const {name, value} = e.target;
    setInputs({ ...inputs, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLoggedin) {
      await axios.put(`${window.location.origin}/api/tasks/${update._id}`, inputs)
      .then((res) => {
        toast.success(`Task ${inputs.title} has been updated.`);
        console.log(res);
      });
    } else {
      toast.error("Please Register first");
    }
  };

  const close = (e) => {
    e.preventDefault();
    document.getElementById("update-task").style.display = "none";
  };
  
  return (
  <section id={id} className="update-task-section bg-app" >
    <div className="container task-note-container h-100">
      <form className="task-note w-100 h-100">
        <h2>Update Your Task</h2>
        <input 
            type="text" 
            placeholder='Task Title' 
            name="title" value={inputs.title} 
            onChange={handleInput}
            className='my-2 px-3 py-3 task-note-input'
        />
        <textarea 
            type="text" 
            placeholder='Write your task here...' 
            name="note" rows="3" value={inputs.note}
            onChange={handleInput}
            className='my-2 px-3 py-3 task-note-input'
        />
        <div className="button-list">
          <button onClick={handleSubmit} type="submit" className='btn btn-update my-2'>Update!</button>
          <button onClick={close} type='button' className='btn btn-warning my-2'>Close</button>
        </div>
      </form>
    </div>
  </section>
  )
}

export default UpdateTask;