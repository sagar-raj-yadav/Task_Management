import express from 'express';
const router = express.Router();
import Task from '../models/task.js';

router.post('/addtask', async (req, res) => {
    const { title, dueDate, priority, status } = req.body;

    const formattedDate = new Date(dueDate).toLocaleDateString('en-US');

    try {
        const newTask = new Task({
            title,
            status, 
            dueDate: formattedDate, 
            priority,
        });

        await newTask.save();
        res.status(201).json(newTask); 
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
});



router.get('/fetchalltask', async (req, res) => {
    const { status } = req.query;  
    const query = status ? { status } : {};  

    try {
        const tasks = await Task.find(query);  // Fetch all tasks without pagination

        res.json({
            tasks,  // Return all tasks based on the query
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Server Error');
    }
});




// Route 3: Update task
router.put("/updatetask/:id", async (req, res) => {
    const { title, user, dueDate, priority, status } = req.body; 
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
                    user,  
                    dueDate, 
                    status,  
                    priority,
                    updatedAt: Date.now() 
                } 
            },
            { new: true, runValidators: true } 
        );

        res.json({ task, success: "Task updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Route 4: Delete task
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
