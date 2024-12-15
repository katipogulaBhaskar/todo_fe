import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const baseURL = 'http://localhost:5000/api'; // Replace with your backend URL

    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');

    // Fetch all tasks
    const fetchTasks = async () => {
        if (!userId) {
            console.error('No userId found in localStorage');
            return;
        }
        try {
            const response = await axios.get(`${baseURL}/fetchAll/${userId}`);
            setTasks(response.data.toDoLists);
        } catch (error) {
            console.error('Error fetching tasks:', error.response?.data?.message || error.message);
        }
    };

    // Add a new task
    const addTask = async () => {
        if (!newTask.trim()) return;
        if (!userId) {
            console.error('No userId found in localStorage');
            return;
        }
        try {
            await axios.post(`${baseURL}/add`, { userId, data: newTask });
            setNewTask('');
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error.response?.data?.message || error.message);
        }
    };

    // Edit a task
    const editTask = async (listId) => {
        const updatedData = prompt('Edit Task:');
        if (!updatedData) return;
        if (!userId) {
            console.error('No userId found in localStorage');
            return;
        }
        try {
            await axios.put(`${baseURL}/edit`, { userId, listId, newData: updatedData });
            fetchTasks();
        } catch (error) {
            console.error('Error editing task:', error.response?.data?.message || error.message);
        }
    };

    // Toggle task completion (Complete/Undo)
    const toggleTaskCompletion = async (listId, currentStatus) => {
        if (!userId) {
            console.error('No userId found in localStorage');
            return;
        }
        try {
            // Toggle completion status in the backend
            await axios.patch(`${baseURL}/complete`, { userId, listId, completed: !currentStatus });

            // Update the local state for immediate UI feedback
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === listId ? { ...task, completed: !currentStatus } : task
                )
            );
        } catch (error) {
            console.error('Error toggling task completion:', error.response?.data?.message || error.message);
        }
    };

    // Delete a task
    const deleteTask = async (listId) => {
        if (!userId) {
            console.error('No userId found in localStorage');
            return;
        }
        try {
            await axios.delete(`${baseURL}/delete`, { data: { userId, listId } }); // Proper payload structure
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== listId)); // Immediate UI update
        } catch (error) {
            console.error('Error deleting task:', error.response?.data?.message || error.message);
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>To-Do List</h2>

            {/* Add Task */}
            <div>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
            </div>

            {/* Task List */}
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <span
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                            }}
                        >
                            {task.data}
                        </span>
                        <button onClick={() => editTask(task._id)}>Edit</button>
                        <button onClick={() => toggleTaskCompletion(task._id, task.completed)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
