import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../common/Loader";
import { AdminBasePage } from "../common/AdminBasePage";

const Detail = ({parking}) => {
    const [liveSlots, setLiveSlots] = useState([])
    useEffect(() => {
        fetchData('http://localhost:8000/api/parkings/' + parking.id + '/live').then(result => {
            setLiveSlots(result.slots)
        })
    },[])
    return (
        
        <>
            <Link className="small mb-1" to={parking.map_location} target="_blank" style={{color: "black"}}>See Location</Link>
            <h1 className="display-5 fw-bolder">{parking.name}</h1>
            
            <div className="container">
                <h3 className="text-center">Live Status</h3>
            <div className="row">
                {liveSlots.map((slot, index) => {
                    return (
                        <div key={index + "boxes"} className="mx-2 col-2 box" style={{color: (slot.status ? "green" : "red")}}>({index + 1})</div>
                    )
                })}
            </div>
            </div>
        </>
    )
}


function AdminParkingLiveStatus() {
    

    const params = useParams()
    const [parking, setParking] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchData('http://localhost:8000/api/parkings/' + params.id).then(result => {
            setParking(result)
            setLoading(false)
        })
    },[])
    return(
        <>
            {loading ? <Loader /> :

                <div className="container mt-4">
                    <div className="row">
						<div className="col-md-3"></div>
                        <div className="col-md-6">
                            <Detail parking={parking}/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export function AdminParkingLiveStatusPage() {
    return(
        <>
            <AdminBasePage>
                <AdminParkingLiveStatus/>
            </AdminBasePage>
        </>
    );
}