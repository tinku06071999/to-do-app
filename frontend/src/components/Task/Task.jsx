import React from 'react';
import moment from 'moment';
import './task.css';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch({ type: 'REMOVE_TASK', id });
    };

    const handleMarkDone = (e) => {
        dispatch({ type: 'MARK_DONE', id });
    };

    return (
        <div className='task-container bg-white p-4 rounded-lg shadow-lg flex items-center justify-between mb-4 transition-all duration-200 ease-in-out'>
            <div className='flex items-center'>
                <input
                    type='checkbox'
                    className='checkbox mr-4'
                    onChange={handleMarkDone}
                    checked={task.completed}
                    aria-label='Mark task as done'
                />
                <div className='task-info'>
                    <h4 className={`task-title text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                    </h4>
                    <p className={`task-description text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
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
