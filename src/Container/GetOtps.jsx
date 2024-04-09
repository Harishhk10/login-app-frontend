// import "./App.css";
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import LeftSideImg from "./CommonTemplate";
import { useNavigate } from "react-router-dom";

function GetOtp() {
  const navigate = useNavigate();
  localStorage.clear();
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4000/api/login/send-otp", {
        user: inputValue,
      })
      .then((res) => {
        if (res?.status === 200 || res?.status === 201) {
          let data = res?.data;

          if (data?.userType === "phone") {
            alert("your otp is :" + data.otp);
          }
          navigate("/verify-otp");

          localStorage.setItem("user", data?.user);
        } else {
          alert("please refresh page");
        }
      })

      .catch((err) => {
        alert("please refresh the page ");
      });
  };

  return (
    <>
      <div className="row g-0 vh-100 justify-content-center align-items-center">
        <div className="col-10 row g-0 align-items-center bordered">
          <LeftSideImg />
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
    </>
  );
}
export default GetOtp;
