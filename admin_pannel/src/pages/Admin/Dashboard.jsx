import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="p-6 bg-gray-50 min-h-screen w-full max-w-6xl m-5">
        
        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border-l-4 border-blue-500">
            <img className="w-12" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.doctors}
              </p>
              <p className="text-gray-500 text-sm">Total Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border-l-4 border-green-500">
            <img className="w-12" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 border-l-4 border-purple-500">
            <img className="w-12" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* ===== LATEST BOOKINGS ===== */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm">
          
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} alt="" className="w-5" />
              <h2 className="text-lg font-semibold text-gray-800">
                Latest Bookings
              </h2>
            </div>
          </div>

          {/* LIST */}
          <div className="divide-y">
            {dashData.latestAppointments.length !== 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <img
                      className="w-11 h-11 rounded-full object-cover"
                      src={item.docData.image}
                      alt=""
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.docData.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {slotDateFormat(item.slotDate)} • {item.slotTime}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT STATUS */}
                  <div>
                    {item.cancelled ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                        Cancelled
                      </span>
                    ) : !item.isCompleted ? (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="text-sm bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
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
                No Appointments Booked
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;