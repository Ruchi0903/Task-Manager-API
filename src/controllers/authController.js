import User from '../models/userModel.js';
import Task from '../models/taskModel.js';
import generateToken from '../utils/generateToken.js';
import { registerSchema, loginSchema, deleteUserSchema } from '../validators/authValidation.js';

// REGISTER
export const registerUser = async (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ username, email, password });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (err) {
        next(err);
    }
};

// LOGIN
export const loginUser = async (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password)))
            return res.status(401).json({ message: 'Invalid credentials' });

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (err) {
        next(err);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = req.user; // already attached by authMiddleware

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            // add more fields if needed
        });
    } catch (err) {
        next(err);
        // console.error('Error fetching user profile:', error);
        // res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { error } = deleteUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { password } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Re-authenticate with password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        // Delete all tasks by this user
        await Task.deleteMany({ user: req.user._id });

        // Delete user
        await User.deleteOne();

        res.status(200).json({ message: 'Your account and tasks have been deleted' })
    } catch (err) {
        next(err);
    }
}