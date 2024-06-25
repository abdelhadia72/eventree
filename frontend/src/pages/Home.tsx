import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axio from "axios";

const Home = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        axio.get('http://localhost:5000/api/events/')
            .then((res) => {
                setEvents(res.data)
            }).catch((err) => {
            console.log(err)
        })
    },[])


    return (
        <>
            <div>Events</div>
            {events && events.map((event: any) => {
                return (
                    <Link to={`event/${event._id}`}>
                        <div className="mb-4 border-2 border-black" key={event.id}>
                            <h1 className="font-bold text-2xl">{event.title}</h1>
                            <p>{event.description}</p>
                        </div>
                    </Link>

                )
            })}
        </>
    )
}
export default Home