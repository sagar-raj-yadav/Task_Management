import express from 'express';
const router = express.Router();
import Task from '../models/task.js';

// ✅ Route 1: Add a New Task
router.post('/addtask', async (req, res) => {
    const { title, description, assignedUser, dueDate, priority, status } = req.body;

    try {
        if (!title || !description || !assignedUser || !dueDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const formattedDate = new Date(dueDate).toLocaleDateString('en-US');

        const newTask = new Task({
            title,
            description,  // ✅ Fixed: Added missing field
            assignedUser, // ✅ Fixed: Added missing field
            status, 
            dueDate: formattedDate, 
            priority,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(400).json({ message: 'Error creating task', error });
    }
});

// ✅ Route 2: Fetch All Tasks (with optional filtering)
router.get('/fetchalltask', async (req, res) => {
    const { status, assignedUser, priority } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (assignedUser) query.assignedUser = assignedUser;
    if (priority) query.priority = priority;

    try {
        const tasks = await Task.find(query);
        res.json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// ✅ Route 3: Update Task
router.put("/updatetask/:id", async (req, res) => {
    const { title, description, assignedUser, dueDate, priority, status } = req.body;
    const { id } = req.params;

    try {
        let task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        task = await Task.findByIdAndUpdate(
            id,
            {
                $set: {
                    title,
                    description,  // ✅ Fixed: Added missing field
                    assignedUser, // ✅ Fixed: Changed 'user' to 'assignedUser'
                    dueDate,
                    status,
                    priority,
                    updatedAt: Date.now(),
                }
            },
            { new: true, runValidators: true }
        );

        res.json({ task, success: "Task updated successfully" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Route 4: Delete Task
router.delete("/deletetask/:id", async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.json({ success: "Task has been deleted", task });
    } catch (error) {
        console.error('Error in delete task:', error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

export default router;
