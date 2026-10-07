import React from 'react'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import {Autoplay } from 'swiper/modules';


const PracticePage = () => {
  return (
    <div className="container-fluid py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Our Doctors</h5>
                <h1 className="display-4">Qualified Healthcare Professionals</h1>
            </div>
            <div className="team-carousel position-relative">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2500,          // 2.5 seconds
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="team-item">
                            <div className="row g-0 bg-light rounded overflow-hidden">
                                <div className="col-12 col-sm-5 h-100">
                                    <img className="img-fluid h-100" src="img/team-1.jpg" style={{ objectFit: "cover" }} />
                                </div>
                                <div className="col-12 col-sm-7 h-100 d-flex flex-column">
                                    <div className="mt-auto p-4">
                                        <h3>Doctor Name</h3>
                                        <h6 className="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
                                        <p className="m-0">Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor</p>
                                    </div>
                                    <div className="d-flex mt-auto border-top p-4">
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" to="#"><i className="fab fa-twitter"></i></Link>
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" to="#"><i className="fab fa-facebook-f"></i></Link>
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle" to="#"><i className="fab fa-linkedin-in"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="team-item">
                            <div className="row g-0 bg-light rounded overflow-hidden">
                                <div className="col-12 col-sm-5 h-100">
                                    <img className="img-fluid h-100" src="img/team-2.jpg" style={{ objectFit: "cover" }} />
                                </div>
                                <div className="col-12 col-sm-7 h-100 d-flex flex-column">
                                    <div className="mt-auto p-4">
                                        <h3>Doctor Name</h3>
                                        <h6 className="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
                                        <p className="m-0">Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor</p>
                                    </div>
                                    <div className="d-flex mt-auto border-top p-4">
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" to="#"><i className="fab fa-twitter"></i></Link>
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" to="#"><i className="fab fa-facebook-f"></i></Link>
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle" to="#"><i className="fab fa-linkedin-in"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="team-item">
                            <div className="row g-0 bg-light rounded overflow-hidden">
                                <div className="col-12 col-sm-5 h-100">
                                    <img className="img-fluid h-100" src="img/team-3.jpg" style={{ objectFit: "cover" }}/>
                                </div>
                                <div className="col-12 col-sm-7 h-100 d-flex flex-column">
                                    <div className="mt-auto p-4">
                                        <h3>Doctor Name</h3>
                                        <h6 className="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
                                        <p className="m-0">Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor</p>
                                    </div>
                                    <div className="d-flex mt-auto border-top p-4">
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" to="#"><i className="fab fa-twitter"></i></Link>
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" to="#"><i className="fab fa-facebook-f"></i></Link>
                                        <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle" to="#"><i className="fab fa-linkedin-in"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
  )
}

export default PracticePage