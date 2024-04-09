// import "./App.css";
import { useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import Notificationalert from "../components/Notificationalert";
import LeftSideImg from "./CommonTemplate";
import { useNavigate } from "react-router-dom";

export const VerifyOtp = () => {
  let local = localStorage.getItem("user");
  const navigate = useNavigate();
  // console.log(userData, "userData");
  const [userCheck, setUserCheck] = useState(local);

  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); // State to track if input field is touched

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setTouched(true); // Set touched to true when input value changes
  };

  useEffect(() => {
    const isValidInput = /^\d{5}$/.test(inputValue);

    setInputValue(inputValue);
    setIsValid(isValidInput);
  }, [inputValue]);
  console.log(isValid);
  const handleSubmit = async (e) => {
    e.preventDefault();

    <Notificationalert
      title="Success"
      content="This is a success message."
      type="success"
    />;

    await axios
      .post("http://localhost:4000/api/login/verify-otp", {
        /* Actual data object here */
        otp: inputValue,
        user: local,
      })
      // 17962
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Proceed with your logic

          navigate("/welcome");
        } else {
          // Handle non-200 status code
          throw new Error("Non-200 status code received");
        }
      })
      .catch((err) => {
        // Handle error
      });

    // Handle form submission logic here
  };

  return (
    <div className="row g-0 vh-100 justify-content-center align-items-center">
      <div className="col-10 row g-0 align-items-center bordered">
        <LeftSideImg />
        <form className="col-12 col-md-6 py-4 px-3">
          <h4 className="login-title text-center">Login</h4>
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              name="user"
              id="floatingInput"
              value={local}
              disabled
            />
            <label for="floatingInput">Email address or phone number</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
              className={`form-control ${
                !isValid && touched ? "is-invalid" : ""
              }`}
              name="otp"
              id="floatingInput"
              value={inputValue}
              onChange={handleChange}
              onBlur={() => setTouched(true)} // Set touched to true on blur event
            />
            <label for="floatingInput">otp</label>
            <p style={{ color: "red" }}>
              {!isValid && touched && <p style={{ color: "red" }}>Enter otp</p>}
            </p>
          </div>

          <div className="text=center">
            {" "}
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block py-3 rounded-3 w-100"
              onClick={handleSubmit}
              disabled={inputValue === "" || !isValid}
            >
              submit otp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// VerifyOtp;
//
