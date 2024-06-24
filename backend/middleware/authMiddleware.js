import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Event from "../models/Event.js";

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({ _id: decoded.id });

        if (!user) {
            return res.status(404).json({ message: "User not found for this token" });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}


// Event owner authorization middleware
const authorizeEventOwner = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({_id: decoded.id});

        if (!user) {
            return res.status(404).json({message: "User not found for this token"});
        }

        req.user = user;
    } catch (error) {
        res.status(401).json({message: "Invalid token"});
    }

    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);


        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        if (event.user_id.toString() !== req.user.id.toString()) {
            return res.status(403).json({ error: 'You don\'t authorized for this event' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error.><' });
    }
};


export {authMiddleware, authorizeEventOwner};
