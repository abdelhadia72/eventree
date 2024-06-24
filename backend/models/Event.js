import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    attendees: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;