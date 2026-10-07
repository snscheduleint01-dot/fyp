import React, {useState, useContext, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../contenxt/AppContext";
import { toast } from "react-toastify";
import axios from "axios";



const DoctorDetails = () => {

  

  const [docInfo, setDocInfo] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const {docId} = useParams();
  const navigate = useNavigate();

  const {doctors, getDoctorsData, backendUrl, token, currencySymbol} = useContext(AppContext);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");


  const fetchDocInfo = () => {
    const doctorInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctorInfo);
    console.log(docInfo)
  };

    const getAvailableSlots = () => {
    if (!docInfo) return;
    setDocSlots([]);

    let today = new Date();
    if (today.getHours() >= 20) {
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      if (today.getDate() === lastDayOfMonth) {
        today.setMonth(today.getMonth() + 1, 1);
      } else {
        today.setDate(today.getDate() + 1);
      }
      today.setHours(10, 0, 0, 0);
    }
    for (let i = 0; i < 20; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;
        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    try {
      if (!token) {
        toast.warn("Login to book Appointment");
        return navigate("/authpage");
      }

      setIsBooking(true);
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);



  return (
    docInfo && (
      <div className="container py-5">

        {/* Doctor Details */}
        <div className="row g-4 align-items-start">

          {/* Doctor Image */}
          <div className="col-md-4">
            <img
              src={docInfo.image}
              alt="Doctor"
              className="img-fluid rounded"
              style={{ backgroundColor: "var(--primary)", objectFit: "cover" }}
            />
          </div>

          {/* Doctor Info */}
          <div className="col-md-8">
            <div className="bg-white p-4 rounded shadow-sm border">

              {/* Name */}
              <h3 className="fw-bold text-dark">
                {docInfo.name}
                <span className="ms-2 text-primary">✔</span>
              </h3>

              {/* Degree & Experience */}
              <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                <p className="mb-0 text-muted">
                  {docInfo.speciality}
                </p>
                <span className="badge bg-light text-dark border">
                  {docInfo.experience} Experience
                </span>
              </div>

              {/* About */}
              <div className="mt-3">
                <h5 className="fw-semibold text-dark">About</h5>
                <p className="text-muted">
                  {docInfo.about}
                </p>
              </div>

              {/* Fee */}
              <p className="mt-3 fw-medium">
                Appointment Fee:{" "}
                <span style={{ color: "var(--secondary)" }}>
                  {currencySymbol} {docInfo.fee}
                </span>
              </p>

            </div>
          </div>
        </div>

        {/* Booking Section */}
        {/* Booking Section */}
        <div className="mt-5">

          <h5 className="fw-semibold text-dark mb-3">Booking Slots</h5>

          {/* Date Slots */}
          <div className="d-flex gap-3 overflow-auto pb-2">

            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  className={`text-center px-3 py-3 rounded-circle ${
                    slotIndex === index
                      ? "text-white"
                      : "border"
                  }`}
                  style={{
                    minWidth: "70px",
                    cursor: "pointer",
                    backgroundColor:
                      slotIndex === index ? "var(--primary)" : "transparent",
                  }}
                >
                  {item.length > 0 && (
                    <>
                      <small>
                        {daysOfWeek[item[0].datetime.getDay()]}
                      </small>
                      <br />
                      <strong>{item[0].datetime.getDate()}</strong>
                    </>
                  )}
                </div>
              ))}

          </div>

          {/* Time Slots */}
          <div className="d-flex gap-3 overflow-auto mt-3 pb-2">

            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <span
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className="px-4 py-2 rounded-pill"
                  style={{
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    backgroundColor:
                      item.time === slotTime ? "var(--primary)" : "transparent",
                    color: item.time === slotTime ? "#fff" : "#6c757d",
                    border:
                      item.time === slotTime
                        ? "none"
                        : "1px solid #dee2e6",
                  }}
                >
                  {item.time}
                </span>
              ))}

          </div>

          {/* Button */}
          <button
            onClick={bookAppointment}
            disabled={isBooking}
            className="btn mt-4 px-5 py-2 text-white d-flex align-items-center gap-2"
            style={{
              backgroundColor: "var(--primary)",
              opacity: isBooking ? 0.7 : 1,
            }}
          >
            {isBooking ? (
              <>
                <span className="spinner-border spinner-border-sm"></span>
                Booking...
              </>
            ) : (
              "Book an Appointment"
            )}
          </button>

        </div>

      </div>
    )
  );
};

export default DoctorDetails;