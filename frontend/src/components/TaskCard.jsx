import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="task-card">
            <h3 className="task-title">Title:{task.title}</h3>
            <p className="task-description">description{task.description}</p>
            <p className="task-details"><strong>Due Date:</strong> {task.dueDate}</p>
            <p className="task-details"><strong>Assigned User:</strong> {task.assignedUser}</p>
            <p className="task-details"><strong>Priority:</strong> {task.priority}</p>
            <p className="task-details"><strong>Status:</strong> {task.status}</p>
            <div className="task-buttons">
                <button className="edit-button" onClick={onEdit}>Edit</button>
                <button className="delete-button" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;
