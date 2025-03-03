import React, { useState, useEffect,useRef } from 'react';
import { AdminBasePage } from '../common/AdminBasePage';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { Loader } from '../common/Loader';
import postData from '../utils/postData';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminParking() {
    const [adminparking, setAdminParking] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModaledit,setShowModaledit]=useState(false);
    const [showModalAddParking, setShowModalAddParking] = useState(false); 
    const [selectedParking, setSelectedParking] = useState(null);
    const [flag,setflag]=useState(false);
    const inputref=useRef(null)
    const editnameref=useRef(null);
    const editstreetref=useRef(null);
    const editcountryref=useRef(null);
    const editcityref=useRef(null);
    const editstateref=useRef(null);
    const editpincoderef=useRef(null);
    const editlocationref=useRef(null);


    useEffect(() => {
        fetch('http://localhost:8000/api/parkings?role=admin')
            .then(response => response.json())
            .then(data => {
                setAdminParking(data);
            })
            .catch(error => console.error('Error fetching parkings:', error));
    }, [flag]);

    const openModal = (parking) => {
		const parkid=parking.id;
		console.log(parkid);
		fetch(`http://localhost:8000/api/parkings/${parkid}/rate`)
		.then(response => response.json())
            .then(data => {
				console.log(data);
                setSelectedParking(data);
            })
            .catch(error => console.error('Error fetching parkings:', error)
		);
        setShowModal(true);
    };
    const openModaledit = (parking) => {
		const parkid=parking.id;
		console.log(parkid);
        setSelectedParking(parking)
        setShowModaledit(true);
    };
    const openModalAddParking = () => {
        setShowModalAddParking(true);
    };


    const closeModal = () => {
        setSelectedParking(null);
        setShowModal(false);
        
    };
    const closeModaledit = () => {
        setSelectedParking(null);
        setShowModaledit(false);
        
    };
    const closeModalAddParking = () => {
        setShowModalAddParking(false);
    };

	const handleSaveChanges = () => {
       
        const data={
            parking_id:selectedParking.parking_id,
            start_time:selectedParking.start_time,
            end_time:selectedParking.end_time,
            rate:inputref.current.value

        }
        
        postData('http://localhost:8000/api/rates',data)
        toast.success("Rate updated successfully!", { autoClose: 2000 });
        closeModal(); // Close the modal after performing actions
    };
    const handleSaveChangesedit = () => {
        // Perform actions like updating rates
        // For demonstration, we'll just show an alert
        const updated_id=selectedParking.id;
        const data={
            name:editnameref.current.value,
            street:editstreetref.current.value,
            city:editcityref.current.value,
            state:editstateref.current.value,
            pincode:editpincoderef.current.value,
            country:editcountryref.current.value,
            map_location:editlocationref.current.value

        }
        postData(`http://localhost:8000/api/parkings/${updated_id}`, data)
        .then(data => {
            setflag(!flag);
            toast.success("Changes updated successfully!", { autoClose: 2000 });
            closeModaledit(); 
        })
        .catch(error => {
            console.error("Error updating changes:", error);
        });
        
       
    };

    const addedParking= ()=>{
        const parkingName = document.getElementById("parkingName").value;
        const streetName = document.getElementById("streetName").value;
        const cityName = document.getElementById("cityName").value;
        const stateName = document.getElementById("stateName").value;
        const areaPincode = document.getElementById("areaPincode").value;
        const countryName = document.getElementById("countryName").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const locationName = document.getElementById("locationName").value;
        const parkingCapacity = document.getElementById("parkingCapacity").value;

        const newParking = {
            name: parkingName,
            street: streetName,
            city: cityName,
            state: stateName,
            pincode: areaPincode,
            country: countryName,
            phone: phoneNumber,
            owner_id:user.id,
            map_location: locationName,
            capacity: parkingCapacity
        };

    // You can do further processing with the newParking object, such as sending it to a server or updating state
        console.log("New Parking Data:", newParking);
        postData('http://localhost:8000/api/parkings', newParking)
        .then(data => {
            setflag(!flag);
            toast.success("Parking Added updated successfully!", { autoClose: 2000 });
            closeModalAddParking(); 
        })
        .catch(error => {
            console.error("Error updating changes:", error);
        });

    // Close the modal after saving the parking
        

    }

    return (
        <>
            <div className="container mt-5">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Street</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                                <th scope="col">Pincode</th>
                                <th scope="col">Country</th>
                                <th scope="col">Owner Id</th>
                                <th scope="col">Location</th>
								<th scope="col">Hourly<br /> Availability</th>
								<th scope="col">TimeFrames <br /> Booked</th>
								<th scope="col">Live Status</th>
                                <th scope="col">Rates</th>
                                <th scope="col">Edit Parking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminparking.map((park, index) => (
                                <tr key={index + "parking"}>
                                    <td>{park.id}</td>
                                    <td>{park.name}</td>
                                    <td>{park.street}</td>
                                    <td>{park.city}</td>
                                    <td>{park.state}</td>
                                    <td>{park.pincode}</td>
                                    <td>{park.country}</td>
                                    <td>{park.owner_id}</td>
                                    <td><Link to={park.map_location} target='_blank'>View</Link></td>
									<td><Link to={'/admin/parking/'+ park.id +'/status'}>View</Link></td>
									<td><Link to={'/admin/parking/'+ park.id +'/status-total'}>View</Link></td>
									<td><Link to={'/admin/parking/'+ park.id +'/live-status'}>View</Link></td>
                                    <td><button type="button" className="btn btn-dark" onClick={() => openModal(park)}>Update</button></td>
                                    <td><button type="button" className="btn btn-dark" onClick={() => openModaledit(park)} >Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {/* Button to open modal for adding a new parking */}
             <div className="text-center">
                <Button variant="dark" onClick={openModalAddParking}>Add Parking</Button>
            </div>
             {/* Modal for adding a new parking */}
             {showModalAddParking && (
                <Modal show={showModalAddParking} onHide={closeModalAddParking}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Parking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <table>
                            <tbody>
                                <tr>
                                    <td><label>Parkings Name</label></td>
                                    <td><input id="parkingName"  type='text'placeholder="Enter Parking Name" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Street Name</label></td>
                                    <td><input id="streetName"  type='text'  placeholder="Enter Street Name" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>City Name</label></td>
                                    <td><input id="cityName"  type='text'  placeholder="Enter City Name" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>State Name</label></td>
                                    <td><input id="stateName"  type='text'  placeholder="Enter State Name" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Area Pincode</label></td>
                                    <td><input id="areaPincode" type='text'  placeholder="Enter Area's Pincode" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Country Name</label></td>
                                    <td><input id="countryName"  type='text'  placeholder="Enter Country Name" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Phone Number</label></td>
                                    <td><input id="phoneNumber"  type='number'  placeholder="Enter Contact Number" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Location Name</label></td>
                                    <td><input id="locationName"  type='text'  placeholder="Enter Parking Location" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Parking Capacity</label></td>
                                    <td><input  id="parkingCapacity" type='number'  placeholder="Enter Parking's Capacity" style={{marginLeft:'10px'}} /></td>
                                </tr>
    
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={closeModalAddParking}>Cancel</Button>
                        <Button variant="dark" onClick={addedParking}>Save Parking</Button>
                    </Modal.Footer>
                </Modal>
            )}
            {showModal && (
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Rate for {selectedParking && selectedParking.name}</Modal.Title>
                    </Modal.Header>
                    {selectedParking ? <Modal.Body>
                        <h1>Current Rate : {selectedParking.rate} </h1>
						<input placeholder='Upadte rate Here' ref={inputref}></input>
						
                    </Modal.Body> : <Loader/>
                    }
                    
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModal}>Close</Button>
                        <Button variant="dark"  onClick={handleSaveChanges}>Update Rate</Button>
                    </Modal.Footer>
                </Modal>
            )}
            {showModaledit && (
                <Modal show={showModaledit} onHide={closeModal}>
                    <Modal.Header >
                        <Modal.Title>Change details for {selectedParking && selectedParking.name}</Modal.Title>
                    </Modal.Header>
                    {selectedParking ? <Modal.Body>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Parkings Name</label></td>
                                    <td><input ref={editnameref} type='text'defaultValue={selectedParking.name}  placeholder="Enter value for field 1" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Street Name</label></td>
                                    <td><input ref={editstreetref} type='text' defaultValue={selectedParking.street} placeholder="Enter value for field 2" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>City Name</label></td>
                                    <td><input ref={editcityref} type='text' defaultValue={selectedParking.city} placeholder="Enter value for field 2" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>State Name</label></td>
                                    <td><input ref={editstateref} type='text' defaultValue={selectedParking.state} placeholder="Enter value for field 2" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Area Pincode</label></td>
                                    <td><input ref={editpincoderef} type='text' defaultValue={selectedParking.pincode} placeholder="Enter value for field 2" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Country Name</label></td>
                                    <td><input ref={editcountryref} type='text' defaultValue={selectedParking.country} placeholder="Enter value for field 2" style={{marginLeft:'10px'}} /></td>
                                </tr>
                                <br/>
                                <tr>
                                    <td><label>Location Name</label></td>
                                    <td><input ref={editlocationref} type='text' defaultValue={selectedParking.location} placeholder="Change Location" style={{marginLeft:'10px'}} /></td>
                                </tr>
    
                            </tbody>
                        </table>
						
                    </Modal.Body> : <Loader/>
                    }
                    
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModaledit}>Close</Button>
                        <Button variant="dark"  onClick={handleSaveChangesedit}>Confirm Change</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export function AdminParkingPage() {
    return (
        <AdminBasePage>
            <AdminParking />
            <ToastContainer />
        </AdminBasePage>
    );
}