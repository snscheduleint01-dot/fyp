import React from 'react'
import { useLocation } from "react-router-dom";

import { Route, Routes } from "react-router-dom";
import Topbar from './components/Topbar/Topbar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home.jsx';
import PracticePage from './pages/PracticePage/PracticePage.jsx';
import About from './pages/About/About.jsx';
import AllDoctors from './pages/AllDoctors/AllDoctors.jsx';
import DoctorDetails from './pages/DoctorDetails/DoctorDetails.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import Services from './pages/Services/Services.jsx';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyAppointments from './pages/MyAppointments.jsx';


const App = () => {

  const location = useLocation();
  const hideFooterRoutes = ["/authpage"];


  return (
    <>
      <ToastContainer />
      <Topbar/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/alldoctors" element={<AllDoctors />} />
        <Route path="/doctordetails/:docId" element={<DoctorDetails />} />

        <Route path="/my-appointments" element={<MyAppointments />} />

        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/services" element={<Services />} />

      </Routes>
      {/* 👇 Hide Footer on Auth Page */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App