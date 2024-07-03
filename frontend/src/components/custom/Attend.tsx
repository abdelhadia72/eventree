import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { Ticket } from 'lucide-react';

const Attend = ({ event_id }) => {
    const { user } = useAuthContext();
    const [message, setMessage] = useState('');


    const attendEvent = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/events/${event_id}/attend`,
                {
                    userId: user.user._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwtToken || user.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error attending event:', error.response.data.message);
        }
    };

    return (
        <>
            <button
                onClick={attendEvent}
                className="bg-red-500 p-2 text-white rounded-lg hover:bg-red-900 active:scale-95 font-bold text-lg flex gap-2 justify-center"
            >
                <Ticket/> Attend
            </button>
            <p className="absolute top-0 left-0 bg-red-400 text-2xl">{message}</p>
        </>
    );
};

export default Attend;
