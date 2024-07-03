import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ALargeSmall, MapPin, Hash, Tags, AlignLeft, ImageUp, SquareLibrary, Binary, CalendarDays, DollarSign } from 'lucide-react';
import { useAuthContext } from '../Hooks/useAuthContext';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface EventData {
    title: string;
    description: string;
    location: string;
    tags: string;
    image: File | null;
    price: string;
    startDate: string;
    endDate: string;
    attendees: string[];
    capacity: number;
    category: string;
    type: string;
}

const EditEvent = () => {
    const { user } = useAuthContext();
    const { eventId } = useParams();
    const [error, setError] = useState<string | null>(null);

    const [data, setData] = useState<EventData>({
        title: '',
        description: '',
        location: '',
        tags: '',
        image: null,
        price: '',
        startDate: '',
        endDate: '',
        attendees: [],
        capacity: 0,
        category: '',
        type: '',
    });

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                console.log(`Fetching data for event ID: ${eventId}`);
                const response = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.jwtToken || user.token}`
                    }
                });
                console.log('Event data fetched:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching event data:', error);
                setError('Failed to fetch event data');
            }
        };
        fetchEventData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Update each field in the data object
        setData(prevData => ({ ...prevData, title: data.title }));
        setData(prevData => ({ ...prevData, description: data.description }));
        setData(prevData => ({ ...prevData, location: data.location }));
        setData(prevData => ({ ...prevData, tags: data.tags }));
        setData(prevData => ({ ...prevData, capacity: data.capacity }));
        setData(prevData => ({ ...prevData, category: data.category }));
        setData(prevData => ({ ...prevData, type: data.type }));
        setData(prevData => ({ ...prevData, price: data.price }));
        setData(prevData => ({ ...prevData, startDate: data.startDate }));
        setData(prevData => ({ ...prevData, endDate: data.endDate }));
        setData(prevData => ({ ...prevData, attendees: JSON.stringify(data.attendees) }));

        if (data.image === null || !(data.image instanceof File)) {
            setData(prevData => ({ ...prevData, image: undefined }));
        } else {
            setData(prevData => ({ ...prevData, image: data.image }));
        }


        console.log("we love this : ", data)

        try {
            const token = user.jwtToken || user.token;
            if (!token) {
                throw new Error("Authorization token is missing.");
            }

            const response = await axios.patch(`http://localhost:5000/api/events/${eventId}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Data sent: ', response.data);
            setData(response.data);
            setError(null);
        } catch (error) {
            console.error('Error updating event data:', error);
            setError('Failed to update event data');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData({ ...data, image: e.target.files[0] });
        }
    };

    return (
        <div className="container max-w-[1200px] pt-12">
            <h1 className="text-4xl mb-12 font-serif font-bold text-center">Edit Event</h1>
            <div className="data">
                <form className="flex w-full gap-10 justify-between" onSubmit={handleSubmit}>
                    <div className="left_side flex-grow">
                        <div className="grid w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="title">
                                <ALargeSmall/>
                                Title
                            </label>
                            <Input value={data.title} className="border border-gray-800" onChange={(e) => setData({...data, title: e.target.value})}
                                   type="text" id="title"/>
                        </div>
                        <div className="grid w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="location">
                                <MapPin className="w-[20px]"/>
                                Location</label>
                            <Input className="border border-gray-800" value={data.location} onChange={(e) => setData({...data, location: e.target.value})}
                                   type="text" id="location"/>
                        </div>
                        <div className="grid w-full items-center gap-1.5 mt-4 mb-6">
                            <Select value={data.type} onValueChange={(value) => setData({ ...data, type: value })}>
                                <label className="flex items-center gap-2 font-bold" htmlFor="type"><Hash />Type</label>
                                <SelectTrigger
                                    className="flex border border-gray-800 w-full items-center gap-1.5">
                                    <SelectValue placeholder="Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="in person">In person</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="tags"><Tags />
                                <p>Tags</p>
                            </label>
                            <Input value={data.tags}
                                   onChange={(e) => setData({...data, tags: e.target.value})}
                                   className="border border-gray-800" type="text" id="tags"/>
                        </div>
                        <div className="grid w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="description"><AlignLeft />Description</label>
                            <Textarea  value={data.description}
                                       onChange={(e) => setData({...data, description: e.target.value})}
                                       className="resize-none h-32 border border-gray-800"
                                       placeholder="Description"/>
                        </div>
                    </div>
                    <div className="right_side flex-grow ">
                        <div
                            className="grid w-full rounded-xl items-center gap-1.5 mt-4 mb-6 h-[120px] relative"
                            style={{
                                backgroundImage: `url(${data.image ? data.image : 'default-image-url'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <label className="absolute inset-0 cursor-pointer">
                                <input
                                    className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <div
                                    className="absolute inset-0 text-white border-gray-800 flex flex-col rounded-xl justify-center items-center">
                                    <ImageUp/>
                                    <p>Upload Image</p>
                                </div>
                            </label>
                        </div>

                        <Select value={data.category} onValueChange={(value) => setData({...data, category: value})}>
                            <label className="flex items-center gap-2 font-bold" htmlFor="category"><SquareLibrary/>Category</label>
                            <SelectTrigger
                                className="flex border border-gray-800 w-full items-center gap-1.5 mt-4 mb-6">
                                <SelectValue placeholder="Category"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="conference">Conference</SelectItem>
                                <SelectItem value="meetup">Meetup</SelectItem>
                                <SelectItem value="webinar">Webinar</SelectItem>
                                <SelectItem value="hackathon">Hackathon</SelectItem>
                                <SelectItem value="seminar">Seminar</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="grid w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold"
                                   htmlFor="capacity"><Binary/>Capacity</label>
                            <Input value={data.capacity}
                                   onChange={(e) => setData({...data, capacity: parseInt(e.target.value)})}
                                   className="border border-gray-800" type="number" name="capacity" id="capacity"/>
                        </div>

                        <div className="w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold mb-2"
                                   htmlFor="startDate"><CalendarDays/>Start Date</label>
                            <Input value={data.startDate}
                                   onChange={(e) => setData({...data, startDate: e.target.value})}
                                   className="border border-gray-800" type="date" name="startDate"
                                   id="startDate"/>
                        </div>
                        <div className="w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold mb-2" htmlFor="endDate"><CalendarDays/>End
                                Date</label>
                            <Input value={data.endDate}
                                   onChange={(e) => setData({...data, endDate: e.target.value})}
                                   className="border border-gray-800" type="date" name="endDate"
                                   id="endDate"/>
                        </div>

                        <div className="w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold"
                                   htmlFor="price"><DollarSign/>Price</label>
                            <Input value={data.price}
                                   onChange={(e) => setData({...data, price: e.target.value})}
                                   className="border border-gray-800" type="text" name="price" id="price"/>
                        </div>
                        <Button className="flex gap-2 hover:gap-4 transition-all items-center" type="submit">
                            Update Event
                            <Send className="w-[20px] "/>
                        </Button>
                    </div>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}

export default EditEvent;
