import { Link } from "react-router-dom";

export function AdminNavBar() {
    return (
        <>
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" to={'/parkings'} >Smart Parking</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/admin/parkingpage'}>Parkings</Link>
                            </li> 
                            <li className="nav-item">
                                <Link className="nav-link" to={'/admin/bookingpage'}>Bookings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/admin/paymentpage'}>Payments</Link>
                            </li>
                            
                            
                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href={'/logout'}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}