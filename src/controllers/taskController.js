import Task from '../models/taskModel.js';
import { createTaskSchema, updateTaskSchema } from '../validators/taskValidation.js';

export const createTask = async (req, res, next) => {
    try {
        const { error } = createTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            user: req.user._id, // attach logged-in user ID
        });

        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

// Get all tasks for logged-in user
export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};


// Update a task (only if owned by user)
export const updateTask = async (req, res, next) => {
    try {
        const { error } = updateTaskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ownership check
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        // Update allowed fields
        const { title, description, status } = req.body;
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;

console.log('task.user:', task?.user);
console.log('req.user._id:', req.user?._id);

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);

    } catch (err) {
        console.error('ERROR:', err); // Add this line
        next(err);
    }
};

// Delete a task (only if owned by user)
export const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Ownership check
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }
console.log('task.user:', task?.user);
console.log('req.user._id:', req.user?._id);

        await task.deleteOne();
        res.status(200).json({ message: 'Task removed' });

        
    } catch (err) {
        console.error('ERROR:', err); // Add this line
        next(err);
    }
};