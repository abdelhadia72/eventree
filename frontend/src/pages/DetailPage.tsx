import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import {SlLocationPin} from "react-icons/sl";
import {LuClock10} from "react-icons/lu";
import {MdOutlineAttachMoney} from "react-icons/md";
import { Badge } from "@/components/ui/badge"
import { Trash2 } from 'lucide-react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const { user } = useAuthContext()
    const navigate = useNavigate();

    useEffect(() => {
        axios(`http://localhost:5000/api/events/${id}`)
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }, [id]);

    { }

    console.log("Data is from details : ", data)

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
                        <div className="location text-gray-800 flex items-start gap-2 mt-3 font-bold">
                            <SlLocationPin className="text-2xl font-bold"/>
                            <p>{data.location}</p>
                        </div>
                        <div className="location text-gray-800 flex items-start gap-2 mt-2 font-bold">
                            <LuClock10 className="text-xl font-light"/>
                            <p>{data.startDate.slice(0, 10)}</p>
                        </div>
                        <div className="location text-gray-800 flex items-start gap-2 mt-1 font-bold">
                            <MdOutlineAttachMoney className="text-2xl"/>
                            <p>{data.price + '$'}</p>
                        </div>
                        <div className="tags mt-4">
                            <h1 className="text-xl mb-3 ">Categories</h1>
                            {data.tags.map((tag: string) => (
                                <span key={tag}>
                                <Badge>{tag}</Badge>
                            </span>
                            ))}
                        </div>
                        <img src='https://static.vecteezy.com/system/resources/previews/000/153/588/non_2x/vector-roadmap-location-map.jpg' alt={data.title} className="mt-10 w-[70%] h-[400px] rounded-2xl object-cover"/>
                    </div>
                </div>
            }
        </div>
    )
}
export default DetailPage
