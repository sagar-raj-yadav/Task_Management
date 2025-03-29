import React, { useState, useEffect } from "react";
import TaskSection from "./TaskSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedPriority, setSelectedPriority] = useState("All");
    const [assignedUser, setAssignedUser] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setIsAuthenticated(true);
        fetchTasks(currentPage);
    }, [selectedStatus, selectedPriority, assignedUser, searchTerm, currentPage]);

    const fetchTasks = async (page = 1) => {
        try {
            const params = new URLSearchParams();
            params.append("page", page);
            params.append("limit", limit);
            if (selectedStatus !== "All") params.append("status", selectedStatus);
            if (selectedPriority !== "All") params.append("priority", selectedPriority);
            if (assignedUser !== "All") params.append("assignedUser", assignedUser);
            if (searchTerm) params.append("search", searchTerm);

            const response = await axios.get(`https://task-management-5ms8.onrender.com/api/task/fetchalltask?${params.toString()}`);

            setTasks(response.data.tasks);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        fetchTasks();
    };

    const removeTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    };

    const tasksByStatus = {
        ToDo: tasks?.filter((task) => task?.status === "To Do") || [],
        InProgress: tasks?.filter((task) => task?.status === "In Progress") || [],
        Completed: tasks?.filter((task) => task?.status === "Completed") || [],
    };

    return (
        <>
            {/* Authentication Navbar */}
            <div className="authNavbar">
                {!isAuthenticated ? (
                    <>
                        <button onClick={() => navigate("/login")}>Login</button>
                        <button onClick={() => navigate("/signup")}>Signup</button>
                    </>
                ) : (
                    <button className="logout" onClick={handleLogout}>Logout</button>
                )}
            </div>

            {/* Filters */}
            <div className="filters">
                <input 
                    type="text" 
                    placeholder="Search tasks by title..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
                    <option value="All">All Statuses</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select onChange={(e) => setSelectedPriority(e.target.value)} value={selectedPriority}>
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select onChange={(e) => setAssignedUser(e.target.value)} value={assignedUser}>
                    <option value="All">All Users</option>
                    <option value="User A">User A</option>
                    <option value="User B">User B</option>
                    <option value="User C">User C</option>
                </select>
            </div>

            {/* Task Board */}
            <div className="task-board">
                <TaskSection title="To Do" tasks={tasksByStatus["ToDo"]} addTask={addTask} removeTask={removeTask} />
                <TaskSection title="In Progress" tasks={tasksByStatus["InProgress"]} addTask={addTask} removeTask={removeTask} />
                <TaskSection title="Completed" tasks={tasksByStatus["Completed"]} addTask={addTask} removeTask={removeTask} />
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
};

export default TaskBoard;
