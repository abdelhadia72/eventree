import Event from '../models/Event.js'
import mongoose from 'mongoose'


// post new event
const postNewEvent = async (req, res) => {
    const { title, description, location, startDate, endDate, tags, attendees, price, capacity, category, type } = req.body;
    const image = req.file ? req.file.path : '';
    const imageUrl = `http://${req.get('host')}/${image}`;

    console.log("From event controllers: ", req.file, req.body, imageUrl)

    try{
        const newEvent = await Event.create({
            title,
            description,
            image : imageUrl,
            location,
            startDate,
            endDate,
            tags,
            attendees,
            price,
            capacity,
            category,
            type,
            user_id: req.user._id
        });
        res.status(201).json({
            ...newEvent.toObject(),
            image: imageUrl
        });

    } catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}

// get all events
const getAllEvents = async (req, res) => {
    const allEvents = await Event.find({}).sort({createdAt: -1})
    if(!allEvents) return res.status(404).json({message: "No event found"});
    res.status(200).json(allEvents);
}

// get single event
const getSingleEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No event found"})
    const event = await Event.findById({_id: id});
    if (!event) return res.status(404).json({message: "No event found"})
    res.status(200).json(event);
}

// update an event
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { ...eventData } = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No event with that id"})

    const event = await Event.findByIdAndUpdate({_id: id}, eventData, {new: true});
    if(!event) return res.status(404).json({message: "No event found"})
    res.status(200).json(event);
}

// delete an event
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No event with that id"})
    const event = await Event.findByIdAndDelete({_id: id});
    if(!event) return res.status(404).json({message: "No event found"})
    res.status(200).json(event);
}

export { getAllEvents, getSingleEvent, postNewEvent, updateEvent, deleteEvent }