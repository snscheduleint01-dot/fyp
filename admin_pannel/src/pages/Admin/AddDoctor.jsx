import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const AddDoctor = () => {
  const [docImage, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Dentist");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { backendUrl, aToken } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImage) return toast.error("Image not selected");

      setLoading(true);

      const formData = new FormData();
      formData.append("image", docImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);

        setName("");
        setEmail("");
        setPassword("");
        setAbout("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setFee("");
        setDocImg(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add Doctor
        </h1>
        <p className="text-sm text-gray-500">
          Fill details to add a new doctor
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-2xl shadow-sm border p-6 max-w-5xl"
      >
        
        {/* IMAGE UPLOAD */}
        <div className="flex items-center gap-5 mb-8">
          <label className="cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border">
              {docImage ? (
                <img
                  src={URL.createObjectURL(docImage)}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <span className="text-sm text-gray-400">Upload</span>
              )}
            </div>
            <input
              type="file"
              hidden
              onChange={(e) => setDocImg(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">
            Upload doctor profile picture
          </p>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="flex flex-col gap-4">
            
            <Input label="Doctor Name" value={name} onChange={setName} />

            <Input label="Email" type="email" value={email} onChange={setEmail} />

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <Select
              label="Experience"
              value={experience}
              onChange={setExperience}
              options={[
                "1 Year","2 Year","3 Year","4 Year","5 Year",
                "6 Year","7 Year","8 Year","9 Year","10 Year"
              ]}
            />

            <Input label="Fee" type="number" value={fee} onChange={setFee} />

          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">

            <Select
              label="Speciality"
              value={speciality}
              onChange={setSpeciality}
              options={[
                "Cardiology Specialist",
                "Neurologist",
                "Orthopedic Surgeon",
                "Dermatologist",
                "Pediatrician",
                "Gynecologist",
              ]}
            />

            <Input label="Education" value={degree} onChange={setDegree} />

            <Input label="Address Line 1" value={address1} onChange={setAddress1} />

            <Input label="Address Line 2" value={address2} onChange={setAddress2} />

          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">About Doctor</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center justify-center transition"
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Add Doctor"}
        </button>
      </form>
    </div>
  );
};

/* ===== REUSABLE INPUT ===== */
const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
      required
    />
  </div>
);

/* ===== REUSABLE SELECT ===== */
const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
    >
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default AddDoctor;