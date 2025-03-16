import mongoose from 'mongoose'
import User from '../models/user.model.js'

export const getUser = async (req, res) => {
    try {
        const user = await User.find({})
        if (user.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        res.status(200).json({ success: true, data: user })
    } catch (error) {
        console.error(error)
        res.status(404).json({ success: false, message: 'Server Error' })
    }
}

export const createUser = async (req, res) => {

    const { username, password, email, phone_number } = req.body

    if (!username || !password || !email || !phone_number) {
        return res.status(400).json({ success: false, message: 'Create user failed' })
    }

    try {
        const user = await User.create(req.body)
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product ID' })
    }

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ success: true, data: user })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Server Error' })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product ID' })
    }

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: 'User deleted successfully' })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Server Error' })
    }
}