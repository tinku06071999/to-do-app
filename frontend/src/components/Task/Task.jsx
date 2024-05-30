import React from 'react';
import axios from "../../Axios/axios";
import moment from 'moment';
import './task.css';
import { useContext,useState } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';

import DeleteIcon from '@mui/icons-material/Delete';

function Task({ task,removeTaskFromState}) {
    const {userToken} = useContext(TokenContext)
    const { dispatch } = useContext(TaskContext);
    const [completed, setCompleted] = useState(task.completed);

 const id = task._id;
    // console.log(id);
    const handleRemove = async (e) => {
        e.preventDefault();
       
        console.log("ID to remove:", id); // Add this line to log the ID being passed
        try {
            // console.log(id);
            await axios.delete(`/task/removeTask/${id}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            
            // dispatch({ type: 'REMOVE_TASK', id  });
            removeTaskFromState(id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    const handleMarkDone = async (e) => {
        e.preventDefault();
    const newCompletedStatus = !completed;
    console.log(`Marking task as ${newCompletedStatus ? 'done' : 'not done'}:`, id);
    try {
      await axios.patch(`/task/updateTask/${id}`, { completed: newCompletedStatus }, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      // Update task status locally
      setCompleted(newCompletedStatus);
    } catch (error) {
      console.error(`Error marking task as ${newCompletedStatus ? 'done' : 'not done'}:`, error);
    }

    // e.preventDefault();
    // const newCompletedStatus = !completed;
    // console.log(`Marking task as ${newCompletedStatus ? 'done' : 'not done'}:`, id);
    // try {
    //   await updateTaskCompletion(id, newCompletedStatus);
    //   // Update task status locally
    //   setCompleted(newCompletedStatus);
    // } catch (error) {
    //   console.error(`Error marking task as ${newCompletedStatus ? 'done' : 'not done'}:`, error);
    // }
    };

        return (
           
        //     <div className='task-container bg-white p-4 rounded-lg shadow-lg flex items-center justify-between mb-4 transition-all duration-200 ease-in-out'>
        //     <div className='flex items-center'>
        //       <input
        //         type='checkbox'
        //         className='checkbox mr-4'
        //         onChange={handleMarkDone}
        //         checked={completed}
        //         aria-label={`Mark task as ${completed ? 'not done' : 'done'}`}
        //       />
        //       <div className='task-info'>
        //         <h4 className={`task-title text-lg font-semibold ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
        //           {task.title}
        //         </h4>
        //         <p className={`task-description text-sm ${completed ? 'text-gray-400' : 'text-gray-600'}`}>
        //           {task.description}
        //         </p>
        //         <div className='task-timestamp text-xs text-gray-400 italic'>
        //           {task?.createdAt ? moment(task.createdAt).fromNow() : 'just now'}
        //         </div>
        //       </div>
        //     </div>
        //     <div className='remove-task'>
        //       <DeleteIcon
        //         style={{ fontSize: 30, cursor: 'pointer' }}
        //         onClick={handleRemove}
        //         className='remove-task-btn text-red-500 hover:text-red-700 transition duration-200 ease-in-out'
        //         aria-label='Remove task'
        //       />
        //     </div>
        //   </div>
        //   );
        <div className='task-container bg-white p-4 rounded-lg shadow-lg flex items-center justify-between mb-4 transition-all duration-200 ease-in-out'>
      <div className='flex items-center'>
        <input
          type='checkbox'
          className='checkbox mr-4 '
          onChange={handleMarkDone}
          checked={completed}
          
          aria-label={`Mark task as ${completed ? 'not done' : 'done'}`}
        />
        <div className='task-info'>
          <h4 className={`task-title text-lg font-semibold ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h4>
          <p className={`task-description text-sm ${completed ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </p>
          <div className='task-timestamp text-xs text-gray-400 italic'>
            {task?.createdAt ? moment(task.createdAt).fromNow() : 'just now'}
          </div>
        </div>
      </div>
      <div className='remove-task'>
        <DeleteIcon
          style={{ fontSize: 30, cursor: 'pointer' }}
          onClick={handleRemove}
          className='remove-task-btn text-red-500 hover:text-red-700 transition duration-200 ease-in-out'
          aria-label='Remove task'
        />
      </div>
    </div>
  );
}

export default Task;
