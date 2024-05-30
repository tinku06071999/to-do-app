import taskModel from "../models/taskModel.js";
import dotenv from "dotenv";
dotenv.config();

const addTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    const newTask = new taskModel({ title, description, completed: false, userId })
    newTask.save()
        .then(() => {
            return (res.status(200).json({ message: "Task added successfully" }))
        })
        .catch((error) => {
            return (
                res.status(500).json({ message: error.message })
            )
        }
        )
}
const removeTask = async (req, res) => {
    const { id } = req.params;
    console.log("ID received:", id); // Log the ID to debug

    if (!id) {
        console.log("Task ID is missing");
        return res.status(400).json({ message: 'Task ID is required' });
    }

    try {
        const task = await taskModel.findByIdAndDelete(id);
        if (!task) {
            console.log("Task not found with ID:", id);
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: error.message });
    }
};

const getTask = (req, res) => {
    taskModel.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}
export { addTask, getTask,removeTask }
