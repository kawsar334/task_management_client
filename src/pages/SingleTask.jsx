import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';

const TaskDetails = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        };
        fetchTasks();
    }, []);

    const handleDragEnd = async (result) => {
        const { destination, source } = result;
        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) return;

        // Reorder tasks locally
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(source.index, 1);
        updatedTasks.splice(destination.index, 0, movedTask);

        setTasks(updatedTasks);

        // Save updated task order to the database
        try {
            await axios.put('/tasks/reorder', updatedTasks);
        } catch (error) {
            console.error('Error saving task order', error);
        }
    };

    const handleEditTask = (taskId) => {
        setIsEditing(true);
        setCurrentTaskId(taskId);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            {isEditing && (
                <TaskForm taskId={currentTaskId} onTaskUpdated={() => setIsEditing(false)} />
            )}

            {!isEditing && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Task Management</h2>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="flex gap-4">
                            {['To-Do', 'In Progress', 'Done'].map((category) => (
                                <Droppable key={category} droppableId={category}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg"
                                        >
                                            <h3 className="text-xl font-semibold mb-2">{category}</h3>
                                            {tasks.filter(task => task.category === category).map((task, index) => (
                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="mb-2 bg-white p-4 rounded-lg shadow-md"
                                                        >
                                                            <h4 className="font-semibold">{task.title}</h4>
                                                            <p>{task.description}</p>
                                                            <div className="flex gap-2 mt-2">
                                                                <button
                                                                    onClick={() => handleEditTask(task._id)}
                                                                    className="text-blue-500"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteTask(task._id)}
                                                                    className="text-red-500"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                    </DragDropContext>
                </>
            )}
        </div>
    );
};

export default TaskDetails;
