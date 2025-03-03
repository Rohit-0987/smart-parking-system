import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { DashboardPage } from '../pages/Dashboard';
import { ParkingPage } from '../pages/ParkingPage';
import { ParkingDetailPage } from '../pages/ParkingDetailPage';
import { BookingPage } from '../pages/BookingPage';
import { AdminNavBar } from '../common/AdminNavBar';
import { AdminBookingPage } from '../pages/AdminBookingPage';
import {AdminParkingPage} from '../pages/AdminParkingPage';
import {AdminPaymentPage} from '../pages/AdminPaymentPage';
import { AdminParkingStatusPage } from '../pages/AdminParkingStatusPage';
import { AdminParkingStatusTotalPage } from '../pages/AdminParkingStatusTotalPage';
import { AdminParkingLiveStatusPage } from '../pages/AdminParkingLiveStatusPage';


const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
        path: "/parkings",
        element: <ParkingPage />,
    },
    {
        path: "/parkings/:id",
        element: <ParkingDetailPage />,
    },
    {
        path: "/bookings",
        element: <BookingPage/>,
    },
    {
        path: "/admin/dashboard",
        element: <AdminNavBar/>
    },
    {
        path: "/admin/bookingpage",
        element: <AdminBookingPage/>
    },
    {
        path: "/admin/parkingpage",
        element: <AdminParkingPage/>
    },
    {
        path: "/admin/parking/:id/status",
        element: <AdminParkingStatusPage/>
    },
    {
        path: "/admin/parking/:id/status-total",
        element: <AdminParkingStatusTotalPage/>
    },
    {
        path: "/admin/parking/:id/live-status",
        element: <AdminParkingLiveStatusPage/>
    },
    {
        path: "/admin/paymentpage",
        element: <AdminPaymentPage/>
    },
]);

if (document.getElementById('react-app')) {
    const Index = ReactDOM.createRoot(document.getElementById("react-app"));
    // console.log(user);
    Index.render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}
