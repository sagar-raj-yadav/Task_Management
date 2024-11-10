import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import axios from 'axios';

const TaskSection = ({ title, tasks, addTask }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleAddTask = async (task) => {
        if (editingTask) {
            // Update existing task
            try {
                const response = await axios.put(`https://task-management-5ms8.onrender.com/api/task/updatetask/${editingTask._id}`, task);
                addTask({ ...response.data, status: title });
            } catch (error) {
                console.error('Error updating task:', error);
            }
        } else {
            // Add new task
            try {
                const response = await axios.post('https://task-management-5ms8.onrender.com/api/task/addtask', {
                    ...task,
                    status: title,
                });
                addTask(response.data);
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
        setShowForm(false);
        setEditingTask(null);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`https://task-management-5ms8.onrender.com/api/task/deletetask/${taskId}`);
            if (response.data.success) {
                // Optionally update your state to remove the task
                addTask({ _id: taskId, delete: true });  // Remove the task from state
            }
        } catch (error) {
            console.error('Error deleting task:', error); // Detailed error logging
        }
    };

    return (
        <div className="task-section">
            <h2>{title}</h2>
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={() => handleEditTask(task)}
                    onDelete={() => handleDeleteTask(task._id)}
                />
            ))}
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="task-list">
                        {provided.placeholder}
                    </div>
                )}
            {showForm ? (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <TaskForm
                            addTask={handleAddTask}
                            onCancel={() => setShowForm(false)}
                            existingTask={editingTask}
                        />
                    </div>
                </div>
            ) : (
                <button onClick={() => setShowForm(true)}>Add Task</button>
            )}
        </div>
    );
};

export default TaskSection;
