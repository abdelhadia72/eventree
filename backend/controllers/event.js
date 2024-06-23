import Event from '../models/Event.js'
import mongoose from 'mongoose'


// post new event
const postNewEvent = async (req, res) => {
    res.status(200).json({message: "New events"})
}

// get all events
const getAllEvents = async (req, res) => {

    res.status(200).json({message: "All events"})
}

// get single event
const getSingleEvent = async (req, res) => {
    res.status(200).json({message: "Single event"})
}

// update a event
const updateEvent = async (req, res) => {
    res.status(200).json({message: "Update event"})
}

// delete a event
const deleteEvent = async (req, res) => {
    res.status(200).json({message: "Delete event"})
}

export { getAllEvents, getSingleEvent, postNewEvent, updateEvent, deleteEvent }