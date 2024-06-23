const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

// Route to Get all tasks
router.get('/:id', async (req, res) => {
    // Fetch all tasks from the database
    try {
        const tasks = await Task.find({ user: req.params.id }).sort({ createdAt: -1}); //Find the task according user ID and descending order it
        if(tasks.length !== 0) {
            res.status(200).json({ tasks });
        } else {
            res.status(200).json({ message: "User haven't write any Tasks"});
        }
    }
    catch(err) {
        res.status(500).json({message:`Server Error during getting tasks. Error: ${err}` });
    }
});

// Route to search for tasks
router.get('/search', async (req, res) => {
    const query = req.query.query; // Get the search query from the request
    try {
        // Find tasks that match the query (case-insensitive search)
        const tasks = await Task.find({ 
            text: new RegExp(query, 'i')  
        }); 
        res.json(tasks);  // Send the matching tasks as a JSON response
    } catch (err) {
        res.status(500).json({message:`Server Error during searching task. Error: ${err}` }); 
    }
});

// Route to add a new task
router.post('/', async (req, res) => {
    try {
        const { title, note, status, id } = req.body;

        // Find the user by email
        const existUser = await User.findById(id);
        if (!existUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Create a new task with the provided details
        const newTask = new Task({ title, note, status, user: existUser._id });

        // Save the task to the database
        await newTask.save();

        // Add the new task to the user's tasks array
        existUser.tasks.push(newTask._id);
        await existUser.save();

        // Respond with the newly created task
        return res.status(200).json({ newTask });
    } catch (err) {
        console.error(`Server Error during Adding new task. Error: ${err}`);
        return res.status(500).json({ message: `Server Error during Adding new task. Error: ${err.message}` });
    }
});

// Route to update task
router.put('/:id', async (req, res) => {
    try {
        const {title, note, status} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, note, status });
        updatedTask.save().then(() => res.status(200).json({ message: "Task Updated" }));
    } catch (err) {
        console.error(`Server Error during Adding new task. Error: ${err}`);
        return res.status(500).json({ message: `Server Error during Updating task. Error: ${err.message}` });
    }
});

// Route to delete task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.body;
        const existUser = await User.findByIdAndUpdate(
            id,
            { $pull: { tasks: req.params.id}}
        );
        if (existUser) {
            await Task.findByIdAndDelete(req.params.id).then(() => {
                res.status(200).json({ message: "Task has been Deleted." });
            })
        }
    } catch (err) {
        console.error(`Server Error during Adding new task. Error: ${err}`);
        return res.status(500).json({ message: `Server Error during Deleting task. Error: ${err.message}` });
    }
});


module.exports = router; // Export the router to be used in server.js