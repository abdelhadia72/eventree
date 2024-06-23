import {Router} from 'express'
import {getSingleEvent, deleteEvent, updateEvent, postNewEvent, getAllEvents} from "../controllers/event.js";

const eventRouter = Router()

// post new event
eventRouter.post('/', postNewEvent)

// get all events
eventRouter.get('/', getAllEvents)

// get single event
eventRouter.get('/:id', getSingleEvent)

// update a event
eventRouter.patch('/:id', updateEvent)

// delete a event
eventRouter.delete('/:id', deleteEvent)

export default  eventRouter