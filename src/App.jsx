import "./App.css";
import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router";
import GetOtp from "./Container/GetOtps";
import { VerifyOtp } from "./Container/VerifyOtp";
import DashBoard from "./Container/Dashboard";

const NoMatch = () => {
  return (
    <>
      <h1>Page not found !</h1>
    </>
  );
};
function App() {
  return (
    <>
      <Routes>
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/" element={<GetOtp />} />
        <Route path="/welcome" element={<DashBoard />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;