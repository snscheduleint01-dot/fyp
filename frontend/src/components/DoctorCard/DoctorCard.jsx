import React from "react";
import { Link, useNavigate } from "react-router-dom";


const DoctorCard = ({ name, category, description, image, id }) => {
  const navigate = useNavigate();
  return (
    <div className="col-lg-6 team-item cursor-pointer" onClick={()=> navigate(`/doctordetails/${id}`)}>
      <div className="row g-0 bg-light rounded overflow-hidden">
        
        {/* Image */}
        <div className="col-12 col-sm-5 h-100">
          <img
            className="img-fluid h-100"
            src={image}
            alt={name}
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Content */}
        <div className="col-12 col-sm-7 h-100 d-flex flex-column">
          <div className="mt-auto p-4">
            <h3>{name}</h3>
            <h6 className="fw-normal fst-italic text-primary mb-4">
              {category}
            </h6>
            <p className="m-0">{description}</p>
          </div>

          {/* Social Links */}
          <div className="d-flex mt-auto border-top p-4">
            <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" to="#">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" to="#">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle" to="#">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;