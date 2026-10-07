import React, {useState, useContext} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from '../../contenxt/AppContext';


const Navbar = () => {
    const {token, setToken} = useContext(AppContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        // remove token or user data here
        localStorage.removeItem("token");
        setToken(false); // ✅ THIS IS THE MAIN FIX
        navigate("/authpage");
    };



  return (
    <>
    <div className="container-fluid sticky-top bg-white shadow-sm">
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                <Link to="/" className="navbar-brand">
                    <h1 className="m-0 text-uppercase text-primary"><i className="fa fa-clinic-medical me-2"></i>Medinova</h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 d-flex align-items-center">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "nav-item nav-link active" : "nav-item nav-link"
                            }
                            >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "nav-item nav-link active" : "nav-item nav-link"
                            }
                            >
                            About
                        </NavLink>

                        <NavLink
                            to="/alldoctors"
                            className={({ isActive }) =>
                                isActive ? "nav-item nav-link active" : "nav-item nav-link"
                            }
                            >
                            All Doctors
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? "nav-item nav-link active" : "nav-item nav-link"
                            }
                            >
                            Contact
                        </NavLink>

                        <NavLink
                            to="/my-appointments"
                            className={({ isActive }) =>
                                isActive ? "nav-item nav-link active" : "nav-item nav-link"
                            }
                            >
                            My Appointments
                        </NavLink>

                        {
                            token ? (
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-outline-danger ms-3 px-4 fw-semibold"
                            >
                                Logout
                            </button>
                            ) : (
                            <Link to="/authpage" className="btn btn-primary ms-3 px-4 fw-semibold">
                                Login
                            </Link>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    </div>
    </>
  )
}

export default Navbar