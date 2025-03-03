import { Link } from "react-router-dom";
import { BasePage } from "../common/BasePage";
import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";


function Parking() {

    
    const [parkings, setParkings] = useState([]);
    const [filteredParking, setFilteredParking] = useState([]);
    const handlechange =(event)=>{
        const inputValue = event.target.value;
        const filtered = inputValue === '' ? parkings : parkings.filter(item =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()) || item.city.toLowerCase().includes(inputValue.toLowerCase())
            || item.street.toLowerCase().includes(inputValue.toLowerCase()) || item.pincode.toString().includes(inputValue)
        );
        setFilteredParking(filtered);
    }
    useEffect(() => {
        fetchData('http://localhost:8000/api/parkings').then(result => {
            setParkings(result),
            setFilteredParking(result)
        })
    },[]);

    return (
        <>
            <div className="container mt-4 mb-3 w-50">
                <input 
                    type="email" className="form-control" id="search-parking" placeholder="Search Parking" 
                    onChange={handlechange}
                />
            </div>
            <div className="container">
                <div className="row">

                    {filteredParking.map((parking, index) => (
                        <div className="col-md-4 col-sm-6" key={index}>
                            <div className="card mb-3 mt-3">
                                <img src="/parking.jpg" style={{objectFit: "cover"}} width="300" height="200" className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{parking.name}</h5>
                                    <p className="card-text">{parking.street}, {parking.city}, {parking.pincode}</p>
                                    <p className="card-text">
                                        <a href={parking.map_location} target="_blank" style={{textDecoration: "none"}}>
                                            <small className="text-muted">See Location</small>
                                        </a>
                                    </p>
                                    <Link to={'/parkings/' + parking.id} className="btn btn-dark">See Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export function ParkingPage() {
    return (
        <BasePage>
            <Parking />
        </BasePage>
    );
}   