import React from 'react'
import './styles.scss'
import { MdOutlinePending } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaMarker } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";

const TaskCard = ({id, title, note, status, update_id, delete_id, display, toComplete, toUpdate}) => {
  
  return (
    <section className="card" style={{width: "18rem"}}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{note.split("", 100)}...</p>
        <div className="card-list ">
          {(status === "completed") 
          ?<div className='btn btn-success status-tag weight-600'>
            <span><MdDoneOutline /></span> Complete
          </div>
          :<div className='btn btn-warning status-tag weight-600'>
            <span><MdOutlinePending/></span> Pending
          </div>
          }
          <div className="button-list">
            {(status !== "completed")
            ?<button onClick={() => {
              toComplete(id);
            }} className="btn btn-success weight-600" title="Mark to Complete Task"><IoMdCheckmark/></button>
            :null}
              <button onClick={() => {
                display("block");
                toUpdate(update_id);
              }} className="btn btn-app weight-600" title="Update Task">
                <FaMarker/>
              </button>
              <button onClick={() => {delete_id(id)}} className="btn btn-danger weight-600" title="Delete Task">
                <AiFillDelete/>
              </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TaskCard