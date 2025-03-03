import React from 'react'
import { useState, useEffect } from 'react';
import { AdminBasePage } from '../common/AdminBasePage';
import { formattedDate, formattedTime } from '../utils/formattedDateTime';

function AdminBooking() {
	const [adminbookings, setadminBookings] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8000/api/bookings')
			.then(response => response.json())
			.then(data => {
				// Assuming data is an array of bookings, set the state with it
				setadminBookings(data);
			})
			.catch(error => console.error('Error fetching bookings:', error));
	}, []);
	return (
		<>
			<div class="container mt-5">
				<div class="table-responsive">
					<table class="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Client Id</th>
								<th scope="col">Parking Id</th>
								<th scope="col">Arrival Time</th>
								<th scope="col">End Time</th>
								<th scope="col">Total amount</th>
								<th scope="col">Status</th>
								<th scope="col">Date</th>
								<th scope="col">Time</th>
							</tr>
						</thead>
						<tbody>
							{adminbookings.map((book, index) => (
								<tr key={index + "booking"}>

									<td>{book.id}</td>
									<td>{book.client_id}</td>
									<td>{book.parking_id}</td>
									<td>{book.start_time}</td>
									<td>{book.end_time}</td>
									<td>{book.total}</td>
									<td>{book.status}</td>
									<td>{formattedDate(book.updated_at)}</td>
									<td>{formattedTime(book.updated_at)}</td>
								</tr>
							))}

						</tbody>
					</table>
				</div>
			</div>

		</>
	)
}

export function AdminBookingPage() {
    return (
        <AdminBasePage>
            <AdminBooking />
        </AdminBasePage>
    );
}   
