import { useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import LeftSideImg from "./CommonTemplate";
import { useNavigate } from "react-router-dom";

export const VerifyOtp = () => {
  let local = localStorage.getItem("user");
  const navigate = useNavigate();

  if (!local) {
    navigate("/");
  }

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4000/api/login/verify-otp", {
        otp: inputValue,
        user: local,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/welcome");
        } else {
          alert("please refresh the page ");
        }
      })
      .catch((err) => {
        alert("please refresh the page ");
      });
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
