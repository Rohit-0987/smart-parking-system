import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { BasePage } from '../common/BasePage';
import { Link } from 'react-router-dom';
import useRazorpay from 'react-razorpay';
import postData from '../utils/postData';
import { toast } from 'react-toastify';
import { Loader } from '../common/Loader';

const calculateTotalAmount = (start_time, end_time, rate) => {
	const startTimeHours = parseInt(start_time.split(":")[0]);
	const endTimeHours = parseInt(end_time.split(":")[0]);
	const timeDifferenceHours = endTimeHours - startTimeHours;
	const timeDifference = timeDifferenceHours >= 0 ? timeDifferenceHours : 1;
	const totalAmount = timeDifference * rate;

	return totalAmount;
};

function Booking() {
	const [Razorpay] = useRazorpay();

	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [refresh, setRefresh] = useState(true);
	useEffect(() => {
		fetch('http://localhost:8000/api/bookings')
			.then(response => response.json())
			.then(data => {
				// Assuming data is an array of bookings, set the state with it
				setBookings(data);
			})
			.catch(error => console.error('Error fetching bookings:', error));
	}, [refresh]);

		
	const options = (booking, time) => {
		const totalAmount = booking.end_time == '' ? calculateTotalAmount(booking.start_time, time, booking.rate.rate) : booking.total;
		return {
			key: "rzp_test_RnBGeIMgMArThb",
			amount: totalAmount * 100,
			currency: "INR",
			name: "Smart Parking",
			description: "We provide the best parking areas with best rates",
			image: "/favicon.ico",
			handler: async (res) => {
				const bookingData = {
					end_time: time,
					fixed_end_time: true,
					total: totalAmount,
				}
				setLoading(true);

				postData('http://localhost:8000/api/bookings/' + booking.id, bookingData).then(response => {})
				const data = {
					client_id: user.id,
					booking_id: booking.id,
					parking_id: booking.parking_id,
					transaction_id: res.razorpay_payment_id,
					payment_id: res.razorpay_payment_id,
				};
				postData('http://localhost:8000/api/payments', data)
				.then(response => {
					setLoading(false);
					toast.success('Payment Done successfully!', {
                        position: "top-right",
                        autoClose: 3000, // Close the toast after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
					setRefresh(prevState => !prevState);
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
    };

    const handlePayment = (booking) => { 
		const date = new Date();
		const time = booking.end_time ? booking.end_time : (date.getHours() + 1 ) + ":00:00";
	
		if(parseInt(time.split(':')[0]) < parseInt(booking.start_time.split(':')[0])) {
			alert('Cannot Pay as departure time ' +time + ' must be greater than arrival time ' + booking.start_time);
			return;
		}
		const dynamicOptions = options(booking, time);

		const razorpay = new Razorpay(dynamicOptions);
		razorpay.open();
    };

	const Pay = ({booking}) => {
		return (
			<>
			Pending&nbsp;  
			<button type='button' className='btn btn-dark btn-sm fs-6' onClick={() => handlePayment(booking)}>Pay</button>
			</>
		)
	}
	return (
		<>
			{loading ? <Loader/> :
			<div className="container mt-5">
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">parking_id</th>
								<th scope="col">Start_time</th>
								<th scope="col">end_time</th>
								<th scope="col">Total amount</th>
								<th scope="col">Slot</th>
								<th scope="col">Payment status</th>
							</tr>
						</thead>
						<tbody>
							{bookings.map((book, index) => (
								<tr key={index + "booking-row"}>
									<td>{book.id}</td>
									<td><Link to={'/parkings/' + book.parking_id}>{book.parking_id}</Link></td>
									<td>{book.start_time}</td>
									<td>{book.end_time}</td>
									<td>{book.total}</td>
									<td>{parseInt(book.slot_no) >= 0 ? parseInt(book.slot_no) + 1 : ''}</td>
									<td>{book.payment ? "Done" : <Pay booking={book} />}</td>

								</tr>

							))}

						</tbody>
					</table>
				</div>
			</div>
			}
		</>
	)
}

export function BookingPage() {
    return (
        <BasePage>
            <Booking />
        </BasePage>
    );
}   



