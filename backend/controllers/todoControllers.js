const asyncHandler = require('express-async-handler');
const Todo = require('../models/todoModel');


// ----------------- GET ALL TODOS ----------------
const getTodos = asyncHandler(async (req, res) => {
    const user = req.user;

    const todos = await Todo.find({ userId: user._id });
    todos.reverse();
    res.status(200).json({
        todos
    })
});

// ----------------- GET A SINGLE TODO ----------------
const getTodo = asyncHandler(async (req, res) => {

    const user = req.user;
    const todoId = req.params.id;

    const todo = await Todo.findOne({ userId: user._id, _id: todoId });
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found!!");
    }

    res.status(200).json({
        todo
    })
});

// ----------------- ADD TODO ----------------
const addTodo = asyncHandler(async (req, res) => {

    const user = req.user;
    const { text } = req.body;

    const todo = await Todo.create({
        userId: user._id,
        text: text,
        completed: false
    })

    const todoId = todo._id;

    res.status(201).json({
        todoId
    })
});

// ----------------- DELETE A TODO ----------------
const deleteTodo = asyncHandler(async (req, res) => {

    const user = req.user;
    const todoId = req.params.id;

    const todo = await Todo.findOneAndDelete({ userId: user._id, _id: todoId });
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found!!");
    }

    res.status(200).json({
        message: 'Todo deleted successfully!!',
    })
});

// ----------------- UPDATE TODO ----------------
const updateTodo = asyncHandler(async (req, res) => {

    const user = req.user;
    const todoId = req.params.id;

    const updatedTodo = await Todo.findOneAndUpdate(
        { userId: user._id, _id: todoId },
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedTodo) {
        res.status(404);
        throw new Error('Todo not found!!');
    }

    res.status(200).json({
        updatedTodo,
    })
});


module.exports = {
    getTodos,
    getTodo,
    addTodo,
    deleteTodo,
    updateTodo,
}