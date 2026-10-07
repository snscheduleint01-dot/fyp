import React, { useContext, useState } from 'react'
import { AppContext } from '../../contenxt/AppContext'
import DoctorCard from '../../components/DoctorCard/DoctorCard'

const AllDoctors = () => {

    const { doctors } = useContext(AppContext);

    const [selectedSpeciality, setSelectedSpeciality] = useState("");
    const [search, setSearch] = useState("");

    const handleFilterChange = (e) => {
        setSelectedSpeciality(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredDoctors = doctors.filter((doc) => {
        const matchesSpeciality = selectedSpeciality
            ? doc.speciality?.toLowerCase() === selectedSpeciality.toLowerCase()
            : true;

        const matchesSearch =
            doc.name?.toLowerCase().includes(search.toLowerCase()) ||
            doc.speciality?.toLowerCase().includes(search.toLowerCase())
            // doc.about?.toLowerCase().includes(search.toLowerCase());

        return matchesSpeciality && matchesSearch;
    });

    return (
        <>
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Find A Doctor</h5>
                        <h1 className="display-4 mb-4">Find A Healthcare Professionals</h1>
                    </div>

                    <div className="mx-auto" style={{ width: "100%", maxWidth: "600px" }}>
                        <div className="input-group">

                            {/* ✅ FILTER */}
                            <select
                                className="form-select border-primary w-25"
                                style={{ height: "60px" }}
                                onChange={handleFilterChange}
                                value={selectedSpeciality}
                            >
                                <option value="">All</option>
                                <option value="Cardiology Specialist">Cardiology Specialist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                            </select>

                            {/* ✅ SEARCH INPUT */}
                            <input
                                type="text"
                                className="form-control border-primary w-50"
                                placeholder="Search By Name, Speciality"
                                value={search}
                                onChange={handleSearchChange}
                            />

                            {/* ✅ BUTTON (optional) */}
                            <button
                                className="btn btn-dark border-0 w-25"
                                onClick={() => console.log("Searching:", search)}
                            >
                                Search
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ RESULTS */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">

                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doc) => (
                                <DoctorCard
                                    key={doc._id}
                                    {...doc}
                                    description={doc.about}
                                    category={doc.speciality}
                                    id={doc._id}
                                />
                            ))
                        ) : (
                            <h4 className="text-center text-muted">No doctors found</h4>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default AllDoctors;