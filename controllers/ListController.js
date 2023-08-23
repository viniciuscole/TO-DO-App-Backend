const List = require('../models/List');
const Task = require('../models/Task');

const getAllLists = async (req, res) => {
    try {
        const lists = await List.find();

        res.json(lists);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const getListById = async (req, res, next) => {
    let list;
    try {
        list = await List.findById(req.params.id);
        if(list == null) {
            return res.status(404).json({message: 'List not found'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.list = list;
    next();
}

const createList = async (req, res) => {
    const list = req.body;
    if(!list.list) {
        return res.status(400).json({message: 'List name is required'});
    }
    try {
        const newList = await List.create(list);
        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateList = async (req, res) => {
    const list = req.body;
    if(!list.list) {
        return res.status(400).json({message: 'List name is required'});
    }
    try {
        const updatedList = await List.findByIdAndUpdate(req.params.id, list, {new: true});
        res.json(updatedList);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const deleteList = async (req, res) => {
    try {
        await List.findByIdAndDelete(req.params.id);
        res.json({message: 'List deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getTasksByListId = async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.json(list.tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createTask = async (req, res) => {
    const task = req.body;
    if(!task.task) {
        return res.status(400).json({message: 'Task name is required'});
    }
    try {
        const list = await List.findById(req.params.id);
        list.tasks.push(task);
        await list.save();
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateTask = async (req, res) => {
    const task = req.body;
    if(!task.task) {
        return res.status(400).json({message: 'Task name is required'});
    }
    try {
        const list = await List.findById(req.params.listId);
        const taskToUpdate = list.tasks.id(req.params.taskId);
        taskToUpdate.task = task.task;
        await list.save();
        res.json({message: 'Task updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteTask = async (req, res) => {
    try{
        // Find the list by ID
        const list = await List.findById(req.params.listId);

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        // Find the task by ID within the list's tasks array
        const taskIndex = list.tasks.findIndex(task => task._id.toString() === req.params.taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Remove the task from the array
        list.tasks.splice(taskIndex, 1);

        // Save the updated list
        await list.save();

        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const toggleStatus = async (req, res) => {
    try{
        const list = await List.findById(req.params.listId);
        const taskToUpdate = list.tasks.id(req.params.taskId);
        taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
        await list.save();
        res.json({message: 'Task updated'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}



module.exports = {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteList,
    getTasksByListId,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus
}
