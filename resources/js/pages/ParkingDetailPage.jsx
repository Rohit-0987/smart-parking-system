import { useEffect, useState, useCallback } from "react";
import { BasePage } from "../common/BasePage";
import { Breadcrumb } from "../common/Breadcrumb";
import fetchData from "../utils/fetchData";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../common/Loader";
import useRazorpay from "react-razorpay";
import postData from "../utils/postData";
import { calculateTimeDifference } from "../utils/timeDifference";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const slotsStatusArray = [];

const emptySlotsStatusArray = () => {
    for (let i = 0; i < 24; i++) {
        slotsStatusArray[i] = { status: 0 };
    }
}

emptySlotsStatusArray();

const Carousel = ({ images }) => {
    return (
        <div className="d-flex justify-content-center">
            <div id="carouselExampleIndicators" className="carousel slide w-75">
                <div className="carousel-indicators">
                    {images.map((image, index) => (
                        <button key={"button" + index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : "false"} aria-label={"Slide " + index + 1}></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div key={"image" + index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                            <img src={image.path} className="d-block w-100" alt="..." />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}


const Detail = ({ parking, rate }) => {
    const [Razorpay] = useRazorpay();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const postBooking = async () => {
        const data = {
            client_id: user.id,
            parking_id: parking.id,
            start_time: formData.start_time,
            end_time: formData.end_time,
            fixed_end_time: formData.end_time == '' ? 0 : 1,
            date: formData.date,
            rate_id: rate.id,
            total: rate.rate * calculateTimeDifference(formData.start_time, formData.end_time),
            slot_no: slot
        };
        const response = postData('http://localhost:8000/api/bookings', data)
            .then(response => {
                setRefresh(!refresh);
                setLoading(false);
                toast.success('Parking booked successfully!', {
                    position: "top-right",
                    autoClose: 3000, // Close the toast after 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return response;
            });
        return await response;
    };

    const calculateTotalAmount = () => {
        // Extract hours from start time and end time
        // Extract hours from start time and end time
        const startTimeHours = parseInt(formData.start_time.split(":")[0]);
        const endTimeHours = parseInt(formData.end_time.split(":")[0]);

        // Calculate time difference in hours
        const timeDifferenceHours = endTimeHours - startTimeHours;

        // Ensure time difference is a positive number
        const timeDifference = timeDifferenceHours >= 0 ? timeDifferenceHours : 1;

        // Calculate total amount
        const totalAmount = timeDifference * rate.rate;

        return totalAmount;
    };



    const today = new Date().toISOString().substr(0, 10);

    const [formData, setFormData] = useState({
        date: today,
        start_time: '00:00:00',
        end_time: '1:00:00',
    });

    const [slot, setSlot] = useState('');

    const options = {
        key: "rzp_test_RnBGeIMgMArThb",
        amount: (rate.rate * calculateTimeDifference(formData.start_time, formData.end_time) * 100),
        currency: "INR",
        name: "Smart Parking",
        description: "We provide the best parking areas with best rates",
        image: "https://example.com/your_logo",
        handler: async (res) => {
            const response = await postBooking();
            const data = {
                client_id: user.id,
                booking_id: response.id,
                parking_id: parking.id,
                transaction_id: res.razorpay_payment_id,
                payment_id: res.razorpay_payment_id,
            };
            postData('http://localhost:8000/api/payments', data)
                .then(response => {
                    toast.success('Payment Done successfully!', {
                        position: "top-right",
                        autoClose: 3000, // Close the toast after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        },
        prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
        },
        theme: {
            color: "black",
        },
    };

    const handlePayment = () => {
        setLoading(true);
        if (prePayment == false) {
            postBooking();
        } else {
            const razorpay = new Razorpay(options);
            razorpay.open();
        }
    };



    const [availability, setAvailability] = useState(false);
    // const handleFormChange = (event) => {
    //     const { name, value } = event.target;
    //     if(name == "end_time") {
    //         setPrePayment(true); // TODO: check for endtime validation to be time
    //     }
    //     setFormData((prevState) => ({ ...prevState, [name]: value }));
    // };
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if (name === "start_time") {
            // Update start time
            setFormData((prevState) => ({ ...prevState, [name]: value, ["end_time"]: ''  }));
            setPrePayment(false);

        } else {
            // Update end time
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };
    const endTimeOptions = [...Array(24).keys()].filter(
        (hour) => hour > parseInt(formData.start_time.split(":")[0])
    );


    const [prePayment, setPrePayment] = useState(true);

    function handlePrePayment(event) {
        setPrePayment(event.target.checked);
    }

    const [slotsStatus, setSlotsStatus] = useState(slotsStatusArray);


    function getDayStatus(bookings) {
        if (!bookings) {
            return slotsStatusArray.map((slot) => { return true })
        }
        bookings.pop()

        emptySlotsStatusArray();
        for(let i = 0; i < 24; i++) {
            bookings.forEach((booking, index) => {
                if (parseInt((booking.start_time).split(':')[0]) <= i && parseInt((booking.end_time).split(':')[0]) >= i + 1 && (booking.flag ?? false) == false) {
                    slotsStatusArray[i].status++;
                } 
            });
        }
        
        return slotsStatusArray;
    }


    useEffect(() => {
        checkAvailability();
    }, [formData, refresh]);

    function checkAvailability() {
        const params = new URLSearchParams();
        params.append('date', formData.date);
        params.append('start_time', formData.start_time);
        params.append('end_time', formData.end_time);

        fetchData('http://localhost:8000/api/parkings/' + parking.id + '/check-availability?' + params.toString()).then(result => {
            setAvailability(result.availability);
            setSlot(result.slot);
            setSlotsStatus(getDayStatus(result.available_slots));
        });
    }
    return (
        <>
            {loading ? <Loader/> :
                <>
                <Link className="small mb-1" to={parking.map_location} target="_blank" style={{ color: "black" }}>See Location</Link>
                <h1 className="display-5 fw-bolder">{parking.name}</h1>
                <div className="fs-5 mb-5">
                    <span className="text-decoration-line-through">₹{Math.round(rate.rate + ((rate.rate * 25) / 100))}/hr</span>
                    <span> ₹{rate.rate}/hr</span>
                </div>
                <p className="lead">
                    {parking.street}, {parking.city}, {parking.state}, {parking.country}, {parking.pincode}
                </p>
                <div className="d-flex">
                    <form className="w-100">
                        <div className="row mb-3">
                            <div className="col-6 mx-auto">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text bg-light-dark" id="addon-wrapping">Date</span>
                                    <input
                                        type="date" min={today} value={formData.date} onChange={(event) => handleFormChange(event)}
                                        name="date" className="form-control" placeholder="Date" aria-label="Date" aria-describedby="addon-wrapping"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5 w-100">
                            <div className="col-6">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text bg-light-dark" id="start_time">
                                        Arrival
                                    </span>
                                    <select
                                        value={formData.start_time}
                                        onChange={(event) => handleFormChange(event)}
                                        name="start_time"
                                        className="form-select"
                                        aria-label="Start"
                                        aria-describedby="start-time"
                                    >
                                        {[...Array(24).keys()].map((hour) => (
                                            <option key={hour} value={`${hour}:00:00`}>{`${hour}:00`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text bg-light-dark" id="end-time">
                                        Departure
                                    </span>
                                    <select
                                        value={formData.end_time}
                                        onChange={(event) => handleFormChange(event)}
                                        name="end_time"

                                        className="form-select"
                                        aria-label="Username"
                                        aria-describedby="end-time"
                                    >
                                        <option key={'not-fixed'} value={''}>Not Fixed</option>
                                        {endTimeOptions.map((hour, index) => (
                                            <option key={hour} value={`${hour}:00:00`}>{`${hour}:00`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="fw-bold">
                                    Total Amount: {formData.end_time == '' ? '--' : '₹'+calculateTotalAmount()}
                                </div>
                            </div>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="pre-payment" disabled={formData.end_time == ''} checked={prePayment} onChange={(event) => handlePrePayment(event)} />
                            <label className="form-check-label" htmlFor="pre-payment">Pre Payment</label>
                        </div>
                        <div className="fw-bold">
                            {availability ?
                                <div className="text-success">This time is available</div>
                                :
                                <div className="text-warning">This time is not available, Please select different date and time</div>
                            }
                        </div>
                        <button className="btn btn-dark flex-shrink-0 mt-3" type="button" disabled={!availability} onClick={(event) => handlePayment(event)}>
                            <i className="bi-cart-fill me-1"></i>
                            Book Now
                        </button>
                    </form>
                </div>
                <div className="container mt-3">
                    <h3 className="text-center">Availability Time-Table (hr)</h3>
                    <div className="row">
                        {slotsStatus.map((slot, index) => {
                            return (
                                <div key={index + "boxes"} className="mx-2 col-2 box" style={{ color: (slot.status >= parseInt(parking.capacity) ? "red" : "green") }}>({index} - {index + 1})</div>
                            )
                        })}
                    </div>
                </div>
                </>
            }
        </>
    )
}


function ParkingDetail() {
    const images = [
        { path: "/parking.jpg" },
        { path: "/parking.jpg" },
    ]

    const params = useParams()
    const [parking, setParking] = useState({})
    const [loading, setLoading] = useState(true)
    const [rate, setRate] = useState(0);
    const [rateLoading, setRateLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchData('http://localhost:8000/api/parkings/' + params.id).then(result => {
            setParking(result)
            setLoading(false)
        })
    }, [])
    useEffect(() => {
        setRateLoading(true)
        fetchData('http://localhost:8000/api/parkings/' + params.id + '/rate').then(result => {
            setRate(result)
            setRateLoading(false)
        })
    }, [])

    return (
        <>

            {(loading && rateLoading) ? <Loader /> :

                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-6">
                            <Carousel images={images} />
                        </div>
                        <div className="col-md-6">
                            <Detail parking={parking} rate={rate} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export function ParkingDetailPage() {
    const breadcrumbLinks = [
        { name: "Home", link: "/dashboard" },
        { name: "Parkings", link: "/parkings" },
        { name: "Details", link: "#" },
    ]

    return (
        <>
            <BasePage>
                <Breadcrumb list={breadcrumbLinks} />
                <ParkingDetail />
                <ToastContainer />
            </BasePage>
        </>
    );
}