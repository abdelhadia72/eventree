import {useState} from 'react';
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

const CreateEventForm = () => {
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
        console.log(data)
    }
    return (
        <div className="container max-w-[1300px] pt-12">
            <h1 className="text-2xl font-serif font-bold italic">Create new event</h1>
            <div className="data">
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="title">Title</label>
                        <Input onChange={(e) => setData({...data, title: e.target.value})} type="text" id="title"/>

                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="description">Description</label>
                        <Textarea onChange={(e) => setData({...data, description: e.target.value})}
                                  placeholder="Description"/>

                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="location">Location</label>
                        <Input onChange={(e) => setData({...data, location: e.target.value})} type="text"
                               id="location"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <label htmlFor="tags">Tags</label>
                        <Input onChange={(e) => setData({...data, tags: e.target.value})} type="text" id="tags"/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="image">Image</label>
                        <Input onChange={(e) => setData({...data, image: e.target.value})} type="text" id="image"/>
                    </div>
                    <div className="w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="image">Date</label>
                        <div className="data flex gap-4 items-center">
                            <Input onChange={(e) => setData({...data, startDate: e.target.value})} type="date" id="startDate"/>
                            <span>To</span>
                            <Input onChange={(e) => setData({...data, endDate: e.target.value})} type="date" id="startDate"/>
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4 mb-6">
                        <label htmlFor="price">Price</label>
                        <Input onChange={(e) => setData({...data, price: e.target.value})} type="text" id="price"/>
                    </div>

                    <Button>Create Event</Button>
                </form>
            </div>
        </div>
    )
}
export default CreateEventForm

