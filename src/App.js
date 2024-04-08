import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false); // State to track if input field is touched

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setTouched(true); // Set touched to true when input value changes
  };

  useEffect(() => {
    const isValidEmail = inputValue.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    const isValidPhone = inputValue.match(/^\d{10}$/);
    const isValidInput = isValidEmail || isValidPhone;

    setInputValue(inputValue);

    setIsValid(isValidInput);
  }, [inputValue]);
  console.log(isValid);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4000/api/login/send-otp", {
        /* Actual data object here */
        user: inputValue,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Proceed with your logic
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
        <div className="d-none d-md-block col-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt=""
            className="img-fluid"
            style={{ maxHeight: "1000px", maxWidth: "100%" }}
          />
        </div>
        <form className="col-12 col-md-6 py-4 px-3">
          <h4 className="login-title text-center">Login</h4>
          <div className="form-floating mb-4">
            <input
              type="email"
              className={`form-control ${
                !isValid && touched ? "is-invalid" : ""
              }`}
              name="user"
              id="floatingInput"
              placeholder="Enter email or phone number"
              value={inputValue}
              onChange={handleChange}
              onBlur={() => setTouched(true)} // Set touched to true on blur event
            />
            <label for="floatingInput">Email address or phone number</label>
            <p style={{ color: "red" }}>
              {!isValid && touched && (
                <p style={{ color: "red" }}>
                  Enter valid email or phone number
                </p>
              )}
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
              get otp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
