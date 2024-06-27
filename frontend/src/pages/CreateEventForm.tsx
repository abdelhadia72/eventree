import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import axios from "axios";
import { useAuthContext } from '../Hooks/useAuthContext';
// import { useNavigate } from "react-router-dom";

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
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('location', data.location);
        formData.append('tags', data.tags);
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
        <div className="container max-w-[1300px] pt-12">
            <h1 className="text-2xl font-serif font-bold italic">Create new event</h1>
            <div className="data">
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="title">Title</label>
                        <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} type="text" id="title" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="description">Description</label>
                        <Textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })}
                                  placeholder="Description" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="location">Location</label>
                        <Input value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} type="text"
                               id="location" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="tags">Tags</label>
                        <Input value={data.tags} onChange={(e) => setData({ ...data, tags: e.target.value })} type="text" id="tags" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="image">Image</label>
                        <Input onChange={handleFileChange} type="file" name="image" id="image" />
                    </div>
                    <div className="w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="image">Date</label>
                        <div className="data flex gap-4 items-center">
                            <Input value={data.startDate} onChange={(e) => setData({ ...data, startDate: e.target.value })} type="date" id="startDate" />
                            <span>To</span>
                            <Input value={data.endDate} onChange={(e) => setData({ ...data, endDate: e.target.value })} type="date" id="endDate" />
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="price">Price</label>
                        <Input value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} type="text" id="price" />
                    </div>
                    <Button>Create Event</Button>
                    {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default CreateEventForm;
