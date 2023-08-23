const Task = require('../models/Task');

const updateTask = async (req, res) => {
    const task = req.body;
    if(!task.task) {
        return res.status(400).json({message: 'Task name is required'});
    }
    try {
        console.log(req.params.listId);
        console.log(req.params.taskId);
        const updatedTask = Task.findByIdAndUpdate()
        //res.json(updatedTask);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteTask = async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.taskId);
        res.json({message: 'Task deleted'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const toggleStatus = async (req, res) => {
    try{
        await Task.findByIdAndUpdate(req.params.id, {isCompleted: !req.body.isCompleted}, {new: true});
        res.json({message: 'Task status updated'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    updateTask,
    deleteTask
}