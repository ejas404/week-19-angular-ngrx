import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc    Retrieve all users
// route    GET /api/admin/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})

// @desc    Create a new user
// route    POST /api/admin/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await User.create({name, email, password});
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data.");
    }
})

// @desc    Edit a user by ID
// route    PUT /api/admin/users/:id
// @access  Private
const editUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findById(id);
    // todo: verify/validate user credentials 
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });

    } else {
        res.status(404);
        throw new Error("User not found.");
    }
})

// @desc    Delete a user by ID
// route    DELETE /api/admin/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

export {getUsers, createUser, editUser, deleteUser};