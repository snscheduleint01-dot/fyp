import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } =
    useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full max-w-6xl m-5">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Appointments
        </h1>
        <p className="text-sm text-gray-500">
          Manage all patient bookings
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        {/* TABLE HEADER */}
        <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1.5fr] px-6 py-4 border-b bg-gray-50 text-sm font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y">
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1.5fr] gap-3 md:gap-0 px-6 py-4 items-center hover:bg-gray-50 transition"
              >
                {/* INDEX */}
                <p className="hidden md:block text-gray-500">
                  {index + 1}
                </p>

                {/* PATIENT */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={item.userData.image}
                    alt=""
                  />
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                </div>

                {/* AGE */}
                <p className="hidden md:block text-gray-600">
                  {calculateAge(item.userData.dob)}
                </p>

                {/* DATE */}
                <p className="text-gray-600 text-sm">
                  {slotDateFormat(item.slotDate)} • {item.slotTime}
                </p>

                {/* DOCTOR */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover bg-gray-200"
                    src={item.docData.image}
                    alt=""
                  />
                  <p className="text-gray-800">
                    {item.docData.name}
                  </p>
                </div>

                {/* FEE */}
                <p className="text-gray-700 font-medium">
                  {currency} {item.docData.fee}
                </p>

                {/* STATUS / ACTION */}
                <div>
                  {item.cancelled ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                      Cancelled
                    </span>
                  ) : !item.isCompleted ? (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No Appointments Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;