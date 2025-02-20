import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Spiner from '../components/Spiner';
import { AuthContext } from '../context/AuthProviders';

const categories = ["To-Do", "In Progress", "Done"];

const Home = () => {
    const { user, signInWithGoogle, signOutUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

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


    const handleEdit =()=>{


    }

    const handledelete =()=>{
        
    }

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Spiner />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex space-x-6">
                    {categories.map((category) => (
                        <Droppable droppableId={category} key={category}>
                            {(provided) => (
                                <div
                                    className="w-1/3 p-4 bg-gray-100 rounded-lg"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2 className="text-2xl font-semibold text-center mb-4">{category}</h2>
                                    {tasks
                                        .filter((task) => task.category === category)
                                        .map((task, index) => {
                                            // Make sure the task._id is unique and consistent
                                            console.log(task._id); // Verify the id value

                                            return (
                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            className="bg-white p-4 mb-4 rounded-lg shadow-md"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <h3 className="font-semibold">{task.title}</h3>
                                                            <h3 className="font-semibold">{task.email}</h3>
                                                            <p className="text-sm text-gray-600">{task.description}</p>
                                                            <button onClick={()=>handleEdit(task)}>edit </button>
                                                            <button onClick={()=>handledelete(task)}>edit </button>

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
