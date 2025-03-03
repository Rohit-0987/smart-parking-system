import React from 'react'
import { useState, useEffect } from 'react';
import { AdminBasePage } from '../common/AdminBasePage';
import { formattedDate, formattedTime } from '../utils/formattedDateTime';

function AdminPayment() {
	const [adminpayment, setadminpayment] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8000/api/payments')
			.then(response => response.json())
			.then(data => {
				// Assuming data is an array of bookings, set the state with it
				setadminpayment(data);
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
								<th scope="col">Booking Id</th>
								<th scope="col">parking Id</th>
								<th scope="col">transaction Id</th>
								<th scope="col">Payment Id</th>
								<th scope="col">Date</th>
								<th scope="col">Time</th>
							</tr>
						</thead>
						<tbody>
							{adminpayment.map((payment, index) => (
								<tr key={index + "payment-row"}>

									<td>{payment.id}</td>
									<td>{payment.client_id}</td>
									<td>{payment.booking_id}</td>
									<td>{payment.parking_id}</td>
									<td>{payment.transaction_id}</td>
									<td>{payment.payment_id}</td>
									<td>{formattedDate(payment.updated_at)}</td>
									<td>{formattedTime(payment.updated_at)}</td>

								</tr>

							))}

						</tbody>
					</table>
				</div>
			</div>
		</>

	)
}

export function AdminPaymentPage() {
	return (
		<AdminBasePage>
			<AdminPayment />
		</AdminBasePage>
	);
}  