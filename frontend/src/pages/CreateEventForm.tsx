import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import axios from "axios";
import { Send, ALargeSmall, MapPin, Hash, Tags, AlignLeft, Image, SquareLibrary, Binary, CalendarDays, DollarSign } from 'lucide-react';
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
    type: string,
}

const CreateEventForm = () => {
    const { user } = useAuthContext();
    const [error, setError] = useState<string | null>(null);
    // const navigate = useNavigate();

    const [data, setData] = useState<EventData>({
        title: '',
        description: '',
        location: '',
        tags: '',
        image: null,
        price: '',
        startDate: '',
        endDate: '',
        attendees: ["at1", "at2", "at3"],
        capacity: 0,
        category: '',
        type: '',
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('location', data.location);
        formData.append('tags', data.tags);
        formData.append('capacity', data.capacity);
        formData.append('category', data.category);
        formData.append('type', data.type);
        if (data.image) {
            formData.append('image', data.image);
        }
        formData.append('price', data.price);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        formData.append('attendees', JSON.stringify(data.attendees));

        console.log("the data is we get : ", user.jwtToken);
        console.log("Data from fromdata is  : ", formData);


        axios({
            method: 'post',
            url: 'http://localhost:5000/api/events',
            data: formData,
            headers: {
                'Authorization': `Bearer ${user.jwtToken || user.token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log("data is ", res);
            // navigate("/");
            setData({
                title: '',
                description: '',
                location: '',
                tags: '',
                image: null,
                price: '',
                startDate: '',
                endDate: '',
                attendees: ["at1", "at2", "at3"],
                capacity: 0,
                category: '',
                type: '',
            });
            setError(null);
        }).catch(err => {
            setError(err.response.data.message);
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData({ ...data, image: e.target.files[0] });
        }
    };

    return (
        <div className="container max-w-[1200px] pt-12 h-[100vh]">
            <h1 className="text-4xl mb-12 font-serif font-bold text-center">Create new event</h1>
            <div className="data">
                <form className="flex w-full gap-10 justify-between" onSubmit={handleSubmit}>
                    <div className="left_side flex-grow">
                        <div className="grid w-full  items-center gap-1.5 mt-4 mb-6">
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
                                   type="text"
                                   id="location"/>
                        </div>
                        <div className="grid w-full items-center gap-1.5 mt-4 mb-6">
                            <Select value={data.type} onValueChange={(value) => setData({ ...data, type: value })}>
                                <label className="flex items-center gap-2 font-bold" htmlFor="type"><Hash />type</label>
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
                        <div className="grid w-full  items-center gap-1.5 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="tags"><Tags />
                            <p>Tags</p>
                            </label>
                            <Input value={data.tags}
                                   onChange={(e) => setData({...data, tags: e.target.value})}
                                   className="border border-gray-800" type="text" id="tags"/>
                        </div>
                        <div className="grid w-full  items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="description"><AlignLeft />Description</label>
                            <Textarea  value={data.description}
                                      onChange={(e) => setData({...data, description: e.target.value})}
                                      className="resize-none h-32 border border-gray-800"
                                      placeholder="Description"/>
                        </div>
                    </div>
                    <div className="right_side flex-grow">
                        <div className="grid w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="image"><Image />Image</label>
                            <Input className="border border-gray-800" onChange={handleFileChange} type="file"
                                   name="image" id="image"/>
                        </div>

                        <Select value={data.category} onValueChange={(value)=> setData({...data, category: value})}>
                            <label className="flex items-center gap-2 font-bold" htmlFor="capcity"><SquareLibrary />Category</label>
                            <SelectTrigger
                                className="flex border border-gray-800 w-full items-center gap-1.5 mt-4 mb-6">
                                <SelectValue placeholder="Category"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="workshop">workshop</SelectItem>
                                <SelectItem value="conference">conference</SelectItem>
                                <SelectItem value="meetup">meetup</SelectItem>
                                <SelectItem value="webinar">webinar</SelectItem>
                                <SelectItem value="hackathon">hackathon</SelectItem>
                                <SelectItem value="seminar">seminar</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="grid w-full items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="capcity"><Binary />Capacity</label>
                            <Input value={data.capacity} onChange={(e) => setData({...data, capacity: e.target.value})} className="border border-gray-800" type="number" name="capacity" id="capacity"/>
                        </div>

                        <div className="w-full  items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold mb-2" htmlFor="image"> <CalendarDays/>Date</label>
                            <div className="data flex gap-4 items-center">
                                <Input className="border border-gray-800" value={data.startDate}
                                       onChange={(e) => setData({...data, startDate: e.target.value})} type="date"
                                       id="startDate"/>
                                <span>To</span>
                                <Input className="border border-gray-800" value={data.endDate}
                                       onChange={(e) => setData({...data, endDate: e.target.value})}
                                       type="date" id="endDate"/>
                            </div>
                        </div>
                        <div className="grid w-full  items-center gap-1.5 mt-4 mb-6">
                            <label className="flex items-center gap-2 font-bold" htmlFor="price"><DollarSign/>Price</label>
                            <Input className="border border-gray-800" value={data.price}
                                   onChange={(e) => setData({...data, price: e.target.value})}
                                   type="number" id="price"/>
                        </div>
                        <Button className="flex gap-2 hover:gap-4 transition-all items-center">
                            Create Event
                            <Send className="w-[20px] "/>
                        </Button>
                        {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateEventForm;
