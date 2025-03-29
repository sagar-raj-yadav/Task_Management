import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="task-card">
            <h3 className="task-title"><strong>Title:</strong> {task.title}</h3>
            <p className="task-description"><strong>Description:</strong> {task.description}</p>
            <p className="task-details"><strong>Due Date:</strong> {task.dueDate}</p>
            <p className="task-details"><strong>Assigned User:</strong> {task.assignedUser}</p>
            <p className="task-details"><strong>Priority:</strong> {task.priority}</p>
            <p className="task-details"><strong>Status:</strong> {task.status}</p>
            <div className="task-buttons">
                <button className="edit-button" onClick={() => onEdit(task._id)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(task._id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;
