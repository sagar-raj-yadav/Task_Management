import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import axios from 'axios';

const TaskSection = ({ title, tasks, addTask, removeTask }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleAddTask = async (task) => {
        try {
            let response;
            if (editingTask) {
                response = await axios.put(
                    `https://task-management-5ms8.onrender.com/api/task/updatetask/${editingTask._id}`,
                    task
                );
            } else {
                response = await axios.post("https://task-management-5ms8.onrender.com/api/task/addtask", {
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                    status: title,
                    assignedUser: task.assignedUser,
                    priority: task.priority,
                });
            }
    
            addTask(response.data.task);
            setShowForm(false);
            setEditingTask(null);
        } catch (error) {
            console.error("Error adding/updating task:", error);
        }
    };
    

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`https://task-management-5ms8.onrender.com/api/task/deletetask/${taskId}`);
            removeTask(taskId);  // UI update ke liye removeTask call karo
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="task-section">
            <h2>{title}</h2>
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={() => { setEditingTask(task); setShowForm(true); }}
                    onDelete={() => handleDeleteTask(task._id)}
                />
            ))}
            {showForm ? (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <TaskForm addTask={handleAddTask} onCancel={() => setShowForm(false)} existingTask={editingTask} />
                    </div>
                </div>
            ) : (
                <button onClick={() => setShowForm(true)}>Add Task</button>
            )}
        </div>
    );
};

export default TaskSection;


