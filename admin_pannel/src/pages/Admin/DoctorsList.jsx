import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";

const DoctorsList = () => {
  const {
    doctors,
    aToken,
    getAllDoctors,
    changeAvailability,
    deleteDoctor,
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const handleDeleteDoctor = (docId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor? This action cannot be undone."
    );

    if (confirmDelete) {
      deleteDoctor(docId);
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-2xl font-medium">All Doctors</h1>

      <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-6">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden"
          >
            {/* Doctor Image */}
            <img
              className="bg-indigo-50 hover:bg-primary transition-all duration-500"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>
              <p className="text-zinc-600 text-sm">
                {item.speciality}
              </p>

              {/* Availability */}
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  id={`available${item._id}`}
                />
                <label htmlFor={`available${item._id}`}>
                  Available
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleDeleteDoctor(item._id)}
                  className="w-full text-sm py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
