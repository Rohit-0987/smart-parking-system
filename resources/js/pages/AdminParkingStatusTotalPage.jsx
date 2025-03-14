import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../common/Loader";
import { AdminBasePage } from "../common/AdminBasePage";

const Detail = ({parking}) => {

    const today = new Date().toISOString().substr(0, 10);

    const [formData, setFormData] = useState({
        date: today,
        start_time: '00:00:00',
        end_time: '',
    });
   
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if(name == "end_time") {
            setPrePayment(true); // TODO: check for endtime validation to be time
        }
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    
    const slotsStatusArray = [];
    for(let i = 0; i < parking.capacity; i++) {
        slotsStatusArray[i] = 0;
    }
    const [slotsStatus, setSlotsStatus] = useState(slotsStatusArray);

    
    function getDayStatus(bookings) {
        if(!bookings) {
            return slotsStatusArray
        }
        bookings.pop()
        const arrCopy = [...slotsStatusArray]
        for(let i = 0; i < bookings.length; i++) {
            arrCopy[parseInt((bookings[i].slot_no))] += 1   
        }
        return arrCopy
    }


    useEffect(() => {
        checkAvailability();
    }, [formData]);

    function checkAvailability() {
        const params = new URLSearchParams();
        params.append('date', formData.date);
        params.append('start_time', formData.start_time);
        params.append('end_time', formData.end_time);

        fetchData('http://localhost:8000/api/parkings/' + parking.id + '/check-availability?' +  params.toString()).then(result => {
            setSlotsStatus(getDayStatus(result.available_slots));
        });
    }
    return (
        
        <>
            <Link className="small mb-1" to={parking.map_location} target="_blank" style={{color: "black"}}>See Location</Link>
            <h1 className="display-5 fw-bolder">{parking.name}</h1>
            
            <div className="d-flex">
                <form className="w-100">
                    <div className="row mb-3">
                        <div className="col-6 mx-auto">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text bg-light-dark" id="addon-wrapping">Date</span>
                                <input 
                                    type="date"  value={formData.date} onChange={(event) => handleFormChange(event)} 
                                    name="date" className="form-control" placeholder="Date" aria-label="Date" aria-describedby="addon-wrapping" 
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container">
                <h3 className="text-center">Availability</h3>
            <div className="row">
                {slotsStatus.map((slot, index) => {
                    return (
                        <div key={index + "boxes"} className="mx-2 col-2 box" style={{color: (slot ? "green" : "red")}}>({slot}/ {parking.capacity})</div>
                    )
                })}
            </div>
            </div>
        </>
    )
}


function AdminParkingStatus() {
    

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

export function AdminParkingStatusTotalPage() {
    return(
        <>
            <AdminBasePage>
                <AdminParkingStatus/>
            </AdminBasePage>
        </>
    );
}