const List = require('../models/List');

const getAllLists = async (req, res) => {
    try {
        const lists = await List.find();
        res.json(lists);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const getList = async (req, res) => {
    res.json(res.list);
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
        const updatedList = await List.findByIdAndUpdate(res.list.id, list, {new: true});
        res.json(updatedList);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteList = async (req, res) => {
    try {
        await res.list.remove();
        res.json({message: 'List deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllLists,
    getList,
    createList,
    updateList,
    deleteList
}
