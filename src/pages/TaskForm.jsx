import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProviders';
import { toast } from 'react-toastify';

const TaskForm = ({ taskId, onTaskUpdated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('To-Do');
     const { user, signInWithGoogle, signOutUser } = useContext(AuthContext);
    


    useEffect(() => {
        if (taskId) {
            axios.get(`https://taskmanagement-snowy.vercel.app/tasks/${taskId}`)
                .then((response) => {
                    const { title, description, category,  } = response.data;
                    setTitle(title);
                    setDescription(description);
                    setCategory(category);
                    
                })
                .catch(err => {
                    console.error('Error fetching task', err)
                    toast.error("Error adding  task")
                });
        }
    }, [taskId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // title, description, category, email
        //  
        const taskData = {
            title,
            description,
            category,
            email: user?.email
        };
        let data ;

        try {
            if (taskId) {
               data= await axios.put(`https://taskmanagement-snowy.vercel.app/tasks/${taskId}`, taskData,{
                withCredentials:true
               });
            } else {
              data=  await axios.post('https://taskmanagement-snowy.vercel.app/tasks', taskData,{
                withCredentials:true
              });
            }
            toast.success("Task saved successfully")
            console.log(data)
        } catch (error) {
            console.error('Error submitting task', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Task Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="50"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description (Optional)</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength="200"
                    required
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
                <select
                required
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                {taskId ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
