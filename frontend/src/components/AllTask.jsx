


import React, { useContext, useState, useEffect } from 'react';
import Task from './Task/Task';
import TaskContext from '../context/TaskContext';
import axios from '../Axios/axios';
import TokenContext from '../context/TokenContext';

function AllTask() {
    const { tasks: initialTasks } = useContext(TaskContext);
    const [tasks, setTasks] = useState(initialTasks);
    const { userToken } = useContext(TokenContext);

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const removeTaskFromState = (id) => {
        setTasks(tasks.filter(task => task._id !== id));
    };

    const updateTaskCompletion = async (id, completed) => {
        try {
            await axios.patch(`/task/updateTask/${id}`, { completed }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            setTasks(tasks.map(task => 
                task._id === id ? { ...task, completed } : task
            ));
        } catch (error) {
            console.error(`Error updating task completion status:`, error);
        }
    };

    return (
        <div>
            {tasks.length !== 0 ? (
                tasks.map((task, index) => (
                    <Task
                        key={task._id}
                        task={task}
                        removeTaskFromState={removeTaskFromState}
                    />
                ))
            ) : (
                <h1>No Task Found</h1>
            )}
        </div>
    );
}

export default AllTask;
