const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
    completed: Boolean
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;