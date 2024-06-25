import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import axio from "axios";

const DeletedPage = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        axio(`http://localhost:5000/api/events/${id}`)
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }, [id]);

    return (
        <div>
            {data &&
                <div className="mb-4 border-2 border-black" key={data.id}>
                    <h1 className="font-bold text-2xl">{data.title}</h1>
                    <p>{data.description}</p>
                    <p>{data.location}</p>
                    <p>{data.startDate}</p>
                    <p>{data.endDate}</p>
                    <p>{data.tags}</p>
                    <p>{data.attendees}</p>
                </div>
            }
        </div>
    )
}
export default DeletedPage
