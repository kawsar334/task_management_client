import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Spiner from '../components/Spiner';
import { AuthContext } from '../context/AuthProviders';
import { toast } from 'react-toastify';

const categories = ["To-Do", "In Progress", "Done"];

const Home = () => {
    const { user, signInWithGoogle, signOutUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [data, setData] = useState(null)
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [modal, setModal] = useState(false)


    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;

        const updatedTasks = [...tasks];
        const [removed] = updatedTasks.splice(source.index, 1);
        removed.category = destination.droppableId;
        updatedTasks.splice(destination.index, 0, removed);
        setTasks(updatedTasks);
    };

    // Fetches the tasks from the backend API
    useEffect(() => {
        const getTask = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://taskmanagement-snowy.vercel.app/tasks?email=${user?.email}`, {
                    withCredentials: true,
                });

                console.log("Tasks:", response.data);
                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error.response?.data || error.message);
                setLoading(true);
                return null;
            }
        };
        getTask();
    }, []);

    const handleEdit = async (task) => {
        setModal(!modal);
        setEditTask(task)


    };


    const handleUpdate = async () => {
        try {
            await axios.put(`https://taskmanagement-snowy.vercel.app/tasks/${editTask._id}`, {
                title: updatedTitle,
                description: updatedDescription,
            });
            setTasks(tasks.map(task => task._id === editTask._id ? { ...task, title: updatedTitle, description: updatedDescription } : task));
            setEditTask(null);
            setModal(false)
            toast.success("Task updated successfull");
            setUpdatedTitle("");
            setUpdatedDescription("")
        } catch (err) {
            toast.error("Error updating task");
        }

    }




    // 


    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`https://taskmanagement-snowy.vercel.app/tasks/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
            toast.success("task deleted successfull");

        } catch (error) {
            console.error("Error deleting task:", error.response?.data || error.message);
        }
    };


    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Spiner />
            </div>
        );
    }
    if (tasks.length === 0) {
        return (
            <div className='h-[500px] w-full flex justify-center items-center  '>
                <h2>Your tasklist is Empty</h2>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">

            {modal && <div className='fixed w-screen h-screen top-0 bg-black inset-0 bg-opacity-35 left-0  flex justify-center items-center flex-col '>
                <div className='bg-white p-4 w-[90%] md:w-[50%] rounded'>
                    <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        placeholder="Task Title"
                    />
                    <textarea
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        placeholder="Task Description"
                    ></textarea>


                    <div className='flex justify-between items-center gap-2'>
                        <button
                            onClick={() => handleUpdate()}
                            className="w-max p-2 bg-teal text-white rounded-lg hover:bg-blue-700"
                        >Update </button>
                        <button
                            onClick={() => setModal(!modal)}
                            className="w-max p-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        >Cancel </button>
                    </div>
                </div>
            </div>}
            <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-col md:flex-row space-x-6">
                    {categories.map((category) => (
                        <Droppable droppableId={category} key={category}>
                            {(provided) => (
                                <div
                                    className="w-full md:w-1/3  p-4 bg-gray-100 rounded-lg"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2 className="text-2xl font-semibold text-center mb-4">{category}</h2>
                                    {tasks
                                        .filter((task) => task.category === category)
                                        .map((task, index) => {

                                            console.log(task._id);

                                            return (
                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            className="bg-white  p-4 mb-4 rounded-lg shadow-md"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <h3 className="font-semibold">{task.title} </h3>


                                                            <h3 className="font-semibold">{task.email}</h3>
                                                            <p className="text-sm text-gray-600">{task.description} </p>
                                                            <div className="flex justify-between mt-2">
                                                                <button
                                                                    onClick={() => handleEdit(task)}
                                                                    className="bg-teal text-white px-2 py-1 rounded"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(task._id)}
                                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>


                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Home;
