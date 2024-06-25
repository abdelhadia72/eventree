import { SlLocationPin } from "react-icons/sl";
import { LuClock10 } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";
import {Link} from "react-router-dom";

const EventCard = ({event}) => {
    return (
        <div>
            {event &&
                <Link to={`/event/${event._id}`}>
                    <div className="mb-4 rounded-lg bg-gray-100 overflow-hidden border-black" key={event.id}>
                        <img src={event.image} alt={event.title} className="w-full h-40 object-cover"/>
                        <div className="text px-6 py-3 pt-4">
                            <h1 className="font-bold text-2xl">{event.title}</h1>
                            <p className="mt-2">{event.description.slice(0, 130) + "..."}</p>
                            <div className="location text-gray-800 flex items-start gap-2 mt-3 font-bold">
                                <SlLocationPin className="text-2xl font-bold"/>
                                <p>{event.location.slice(0, 25) + '...'}</p>
                            </div>
                            <div className="location text-gray-800 flex items-start gap-2 mt-2 font-bold">
                                <LuClock10 className="text-xl font-light"/>
                                <p>{event.startDate.slice(0, 10)}</p>
                            </div>
                            <div className="location text-gray-800 flex items-start gap-2 mt-1 font-bold">
                                <MdOutlineAttachMoney className="text-2xl"/>
                                <p>{event.price + '$'}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            }
        </div>
    )
}
export default EventCard
