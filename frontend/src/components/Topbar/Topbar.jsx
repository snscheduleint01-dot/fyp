import React from 'react'

import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <>
    <div className="container-fluid py-2 border-bottom d-none d-lg-block">
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                    <div className="d-inline-flex align-items-center">
                        <Link className="text-decoration-none text-body pe-3" to=""><i className="bi bi-telephone me-2"></i>+012 345 6789</Link>
                        <span className="text-body">|</span>
                        <Link className="text-decoration-none text-body px-3" to=""><i className="bi bi-envelope me-2"></i>info@example.com</Link>
                    </div>
                </div>
                <div className="col-md-6 text-center text-lg-end">
                    <div className="d-inline-flex align-items-center">
                        <Link className="text-body px-2" to="">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link className="text-body px-2" to="">
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link className="text-body px-2" to="">
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link className="text-body px-2" to="">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link className="text-body ps-2" to="">
                            <i className="fab fa-youtube"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Topbar