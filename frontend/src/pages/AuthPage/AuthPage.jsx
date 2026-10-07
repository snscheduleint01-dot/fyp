import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contenxt/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {

  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken, backendUrl } = useContext(AppContext);


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
          console.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
          console.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);


  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "calc(100vh - 128px)",
        background: "var(--light)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "15px",
        }}
      >
        <div
          className="card-header text-center"
          style={{
            background: "var(--primary)",
            color: "#fff",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <h3>{state === "Sign Up" ? "Create Account" : "Login"}</h3>
        </div>

        <div className="card-body p-4">
          <form onSubmit={onSubmitHandler} >
            
            {/* SIGNUP FIELD */}
            {state === "Sign Up" && (
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn w-100"
              style={{
                background: "var(--secondary)",
                color: "#fff",
              }}
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
          </form>

          {/* TOGGLE */}
          <div className="text-center mt-3">
            <p>
              {state === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                style={{
                  color: "var(--primary)",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => setState(prev => prev === "Login" ? "Sign Up" : "Login")}
              >
                {state === "Login"? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;