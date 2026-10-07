
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const [doctors, setDoctors] = useState([]);
    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem("token") ?? false);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/list");
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                console.error(data.message);
                toast(data.message);
            }
        } catch (error) {
            console.error(error);
            toast(error.message);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);


    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );

}


export default AppContextProvider;



