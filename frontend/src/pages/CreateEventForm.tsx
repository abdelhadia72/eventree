import {useState} from 'react';
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import axios from "axios";
import { useAuthContext } from '../Hooks/useAuthContext';
// import { useNavigate} from "react-router-dom";

const CreateEventForm = () => {
    const { user } = useAuthContext();
    const [error, setError] = useState<string | null>(null);
    // const navigate = useNavigate();

    const [data, setData] = useState<object>({
        title: '',
        description: '',
        location: '',
        tags: '',
        image: '',
        price: '',
        startDate: '',
        endDate: '',
        attendees: ["at1", "at2", "at3"],
    });


    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log("the data is we get : ", user.jwtToken)

        axios({
            method: 'post',
            url: 'http://localhost:5000/api/events',
            data: data,
            headers: {
                'Authorization': `Bearer ${user.jwtToken || user.token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("data is ", res)
            // navigate("/")
            setData({
                title: '',
                description: '',
                location: '',
                tags: '',
                image: '',
                price: '',
                startDate: '',
                endDate: '',
                attendees: ["at1", "at2", "at3"],
            })
            setError(null)
        }).catch(err => {
            setError(err.response.data.message)
        })
    }
    return (
        <div className="container max-w-[1300px] pt-12">
            <h1 className="text-2xl font-serif font-bold italic">Create new event</h1>
            <div className="data">
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="title">Title</label>
                        <Input value={data.title} onChange={(e) => setData({...data, title: e.target.value})} type="text" id="title"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="description">Description</label>
                        <Textarea value={data.description} onChange={(e) => setData({...data, description: e.target.value})}
                                  placeholder="Description"/>

                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="location">Location</label>
                        <Input value={data.location} onChange={(e) => setData({...data, location: e.target.value})} type="text"
                               id="location"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="tags">Tags</label>
                        <Input value={data.tags} onChange={(e) => setData({...data, tags: e.target.value})} type="text" id="tags"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="image">Image</label>
                        <Input value={data.image} onChange={(e) => setData({...data, image: e.target.value})} type="text" id="image"/>
                    </div>
                    <div className="w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="image">Date</label>
                        <div className="data flex gap-4 items-center">
                            <Input value={data.startDate} onChange={(e) => setData({...data, startDate: e.target.value})} type="date" id="startDate"/>
                            <span>To</span>
                            <Input value={data.endDate} onChange={(e) => setData({...data, endDate: e.target.value})} type="date" id="startDate"/>
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="price">Price</label>
                        <Input value={data.price} onChange={(e) => setData({...data, price: e.target.value})} type="text" id="price"/>
                    </div>

                    <Button>Create Event</Button>
                    {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}
                </form>
            </div>
        </div>
    )
}
export default CreateEventForm

