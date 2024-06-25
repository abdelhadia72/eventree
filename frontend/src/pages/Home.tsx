import {useEffect, useState} from "react";
import axio from "axios";
import EventCard from "@/components/custom/EventCard.tsx";

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
        <div className="container max-w-[1300px] pt-12">
            <div className="font-bold text-2xl py-4 mb-8">Events</div>
            <div className="grid grid-cols-3 gap-4">
                {events && events.map((event) => (
                    <EventCard event={event}/>
                ))}
            </div>

        </div>
    )
}
export default Home