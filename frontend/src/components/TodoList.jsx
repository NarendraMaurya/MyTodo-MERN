import React from 'react'
import { FaCheckDouble, FaEdit, FaTrash } from "react-icons/fa";
import { deleteTodo, updateTodo } from '../services/AuthServices';


const TodoList = ({ todos, getSingleTask }) => {

    const handleDelete = async (id) => {
        await deleteTodo(id);
    }

    const handleComplete = async (id, text, completed) => {
        await updateTodo({ id, text, completed });
    }

    return (
        <div className="todo-list">
            {
                todos.map((todo, idx) => {
                    return (
                      <div key={todo._id} className="task-item">
                        <div className="todo-left">
                          <b>{idx + 1}.</b>
                          {!todo.completed ? (
                            <span>{todo.text}</span>
                          ) : (
                            <strike>{todo.text}</strike>
                          )}
                        </div>
                        <div className="created-time">
                          <small>
                            {new Date(todo.createdAt).toLocaleString()}
                          </small>
                        </div>
                        <div className="todo-right">
                          <FaCheckDouble
                            color="green"
                            onClick={() =>
                              handleComplete(
                                todo._id,
                                todo.text,
                                !todo.completed
                              )
                            }
                          />
                          <FaEdit
                            color="purple"
                            onClick={() => getSingleTask(todo._id, todo.text)}
                          />
                          <FaTrash
                            color="red"
                            onClick={() => handleDelete(todo._id)}
                          />
                        </div>
                      </div>
                    );
                })
            }
        </div>
    )
}

export default TodoList