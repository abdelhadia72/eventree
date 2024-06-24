import {Router} from 'express'
import {getSingleEvent, deleteEvent, updateEvent, postNewEvent, getAllEvents} from "../controllers/event.js";
import {authMiddleware, authorizeEventOwner} from '../middleware/authMiddleware.js'

const eventRouter = Router()

// post new event
eventRouter.post('/', authMiddleware , postNewEvent)

// get all events
eventRouter.get('/', getAllEvents)

// get single event
eventRouter.get('/:id', getSingleEvent)

// update an event
eventRouter.patch('/:id',authorizeEventOwner, updateEvent)

// delete an event
eventRouter.delete('/:id', deleteEvent)

export default  eventRouter