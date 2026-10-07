import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contenxt/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAppointments = () => {
      const { token, backendUrl, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[dateArray[1]] + " " + dateArray[2];
  };

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUsersAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUsersAppointments();
            toast.success(data.message);
            navigate("/my-appointments");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUsersAppointments();
      getDoctorsData();
    }
  }, [token]);



return (
  <div className="container py-5">

    {/* Page Title */}
    <div className="mb-4">
      <h3 className="fw-bold" style={{ color: "var(--dark)" }}>
        My Appointments
      </h3>
      <hr />
    </div>

    {/* Appointments List */}
    {appointments.length > 0 ? (
      <div className="row g-4">

        {appointments.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card border-0 shadow-sm rounded-4 p-3">

              <div className="row g-3 align-items-center">

                {/* Doctor Image */}
                <div className="col-md-2 text-center">
                  <img
                    src={item.docData.image}
                    alt=""
                    className="img-fluid rounded-3"
                    style={{ backgroundColor: "var(--light)" }}
                  />
                </div>

                {/* Doctor Info */}
                <div className="col-md-6">
                  <h5 className="fw-semibold mb-1" style={{ color: "var(--dark)" }}>
                    {item.docData.name}
                  </h5>

                  <p className="mb-1 text-muted">
                    {item.docData.speciality}
                  </p>

                  <p className="mb-1 small">
                    <strong>Address:</strong> <br />
                    {item.docData.address.line1}, {item.docData.address.line2}
                  </p>

                  <p className="mb-0 small">
                    <strong>Date & Time:</strong>{" "}
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>

                {/* Status + Actions */}
                <div className="col-md-4 text-md-end">

                  {/* Paid */}
                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <span className="badge px-3 py-2 mb-2"
                      style={{ backgroundColor: "var(--primary)" }}>
                      Paid
                    </span>
                  )}

                  {/* Cancel Button */}
                  {!item.cancelled && !item.isCompleted && (
                    <div>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        disabled={item.payment}
                        className="btn btn-outline-danger w-100 mt-2"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}

                  {/* Cancelled */}
                  {item.cancelled && !item.isCompleted && (
                    <div className="text-danger fw-semibold mt-2">
                      Appointment Cancelled
                    </div>
                  )}

                  {/* Completed */}
                  {item.isCompleted && (
                    <div className="text-success fw-semibold mt-2">
                      Appointment Completed
                    </div>
                  )}

                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    ) : (

      /* Empty State */
      <div className="text-center py-5">

        <h5 className="text-muted mb-3">No appointments found</h5>

        <p style={{ color: "var(--secondary)" }}>
          Book your first appointment with our specialists
        </p>

        <button
          className="btn px-4 py-2 mt-3 text-white"
          style={{ backgroundColor: "var(--primary)" }}
          onClick={() => navigate("/alldoctors")}
        >
          Book Appointment
        </button>

      </div>
    )}
  </div>
);
}

export default MyAppointments