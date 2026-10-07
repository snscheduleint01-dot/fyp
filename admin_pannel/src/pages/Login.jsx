import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // background_image is here
import { AdminContext } from "../context/AdminContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Login = () => {
  const [state, setState] = useState("Admin");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", { email, password });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          await sleep(2000);
          toast.success(data.message);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", { email, password });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          navigate("/doctor");
          await sleep(2000);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${assets.background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-lg shadow-lg bg-white/80"
        onSubmit={onSubmitHandler}
      >
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-primary"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="w-full relative">
          <p>Password</p>
          <input
            type={showPassword ? "text" : "password"}
            className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-primary"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <span
            className="absolute right-3 top-11 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          className="bg-primary text-white w-full py-2 rounded-md text-lg flex items-center justify-center gap-2 disabled:opacity-70"
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <div className="h-2 w-2 rounded-full bg-white animate-bounce"></div>
              <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </>
          ) : (
            "Login"
          )}
        </button>

        {state === "Admin" ? (
          <p className="text-sm font-medium">
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="text-sm font-medium">
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
