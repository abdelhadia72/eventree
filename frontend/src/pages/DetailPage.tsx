import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge"
import { Trash2 } from 'lucide-react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { Clock, Clock8, MapPinned, BadgeDollarSign, Ticket, ScrollText, Video, User } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";
import Attend from "@/components/custom/Attend.tsx";

const formatDate = (dateString: string) => {
    return moment(dateString).format('dddd D MMMM [at] h A');
}

const DetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const { user } = useAuthContext()
    const navigate = useNavigate();
    const [IconComponent, setIconComponent] = useState<any>(null);

    useEffect(() => {
        axios(`http://localhost:5000/api/events/${id}`)
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
            console.log(err)
        })

    }, [id]);

    // icons

    const DeleteHandler = () => {
        console.log("Delete event")
        axios({
            method: 'delete',
            url: `http://localhost:5000/api/events/${id}`,
            headers: {
                'Authorization': `Bearer ${user.jwtToken || user.token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("to delete data : ", res)
            navigate("/")
        }).catch(err => {
            console.log("Error to delete data is : ", err)
        })
    }

    return (
        <div className="max-w-[1300px] m-auto container my-4 mb-10">
            {data &&
                <div className="mb-4" key={data.id}>
                    <div className="img relative">
                        <img src={data.image} alt={data.title} className="w-full h-[500px] rounded-2xl object-cover"/>


                        {user?.user._id == data?.user_id &&
                            <div onClick={DeleteHandler}
                                 className="trash flex gap-2 group transition-all  absolute top-4 right-4 text-red-500 bg-white p-2 rounded-sm cursor-pointer hover:scale-105">
                                <Trash2/>
                            </div>
                        }

                    </div>
                    <div className="text mt-4">
                        <h1 className="font-bold text-3xl mb-3">{data.title}</h1>
                        <p className="text-xl font-serif italic mb-5">{data.description}</p>
                        <div className="more_info justify-between flex">
                            <div className="left ">
                                <div className="location text-gray-800 flex items-start gap-2 mt-3 font-bold">
                                    <div className="bg-blue-600 p-2 px-[10px] rounded-sm text-white">
                                        <MapPinned className="w-[20px] font-light"/>

                                    </div>
                                    <p>{data.location}</p>
                                </div>
                                <div className="startDate text-gray-800 flex items-start gap-2 mt-2 font-bold">
                                    <div className="bg-orange-600 p-2 px-[10px] rounded-sm text-white">

                                        <Clock className="w-[20px] font-light"/>
                                    </div>
                                    <p>{formatDate(data.startDate)}</p>
                                </div>
                                <div className="endDate text-gray-800 flex items-center gap-2 mt-2 font-bold">
                                    <div className="bg-yellow-500 p-2 px-[10px] rounded-sm text-white">
                                        <Clock8 className="w-[20px] font-light"/>
                                    </div>
                                    <p>{formatDate(data.endDate)}</p>
                                </div>
                                <div className="price text-gray-800 flex items-center gap-2 mt-1 font-bold">
                                    <div className="bg-green-500 p-2 px-[10px] rounded-sm text-white">
                                        <BadgeDollarSign className="w-[20px] font-light"/>
                                    </div>
                                    <p>{data.price + '$'}</p>
                                </div>
                                <div className="tags mt-4">
                                    <h1 className="text-xl mb-3 ">Tags</h1>
                                    {data.tags.map((tag: string) => (
                                        <span key={tag}>
                                <Badge>{tag}</Badge>
                            </span>
                                    ))}
                                </div>
                            </div>
                                <div className="right flex flex-col min-w-[250px] border-[2px] h-fit rounded-lg">
                                    {/*<div onChange={<Attend event_id={id}/>} className="bg-red-500 hover:bg-red-900 active:scale-95 font-bold text-lg flex gap-2 justify-center"><Ticket/>Attend</div>*/}
                                    <Attend event_id={id}/>
                                    <p className="bg-transparent rounded-sm p-2 text-center font-bold">{data.price == 0 ? "Free" : `${data.price} $`}</p>
                                </div>
                        </div>

                        <div className="tags mt-6">
                            <h1 className="text-xl mb-3 ">Place</h1>
                            <div className="holder flex items-center gap-2">
                                {/*<UsersRound className="w-5"/>*/}
                                <Badge
                                    className="bg-red-500 p-2 font-bold font-serif text-[18px] w-[40px] h-[40px] rounded-sm text-white">{data.capacity}</Badge>
                                <p className="font-bold">Place Left</p>
                            </div>
                        </div>

                        <div className="tags mt-6">
                            <h1 className="text-xl mb-3 ">Category</h1>
                            <div className="holder flex items-center gap-2">
                                <div className="bg-red-500 p-2 px-[10px] rounded-sm text-white">
                                    <ScrollText className="w-5 "/>
                                </div>
                                <p className="font-bold">{data.category}</p>
                            </div>
                        </div>

                        <div className="tags mt-6">
                            <h1 className="text-2xl mb-3 ">Type</h1>
                            <div className="holder flex items-center gap-2 font-bold">
                                <div className="bg-red-500 p-2 px-[10px] rounded-sm text-white">
                                    {data.type === 'online' ? <Video className="w-5"/> : <User className="w-5"/>}
                                </div>
                                {data.type}
                            </div>
                        </div>


                        <img
                            src='https://static.vecteezy.com/system/resources/previews/000/153/588/non_2x/vector-roadmap-location-map.jpg'
                            alt={data.title} className="mt-10 w-[70%] h-[400px] rounded-2xl object-cover"/>
                    </div>
                </div>
            }

        </div>
    )
}
export default DetailPage
