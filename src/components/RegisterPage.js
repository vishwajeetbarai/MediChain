import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <NavBar />

      {/* Main content area */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 font-sans">
        <div className="space-y-8 mt-[-50px] w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-10">

          <h1 className="text-2xl font-semibold text-center text-black mb-6">Register</h1>

          <button
            className="bg-white text-black font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white shadow-md"
            onClick={() => {
              navigate("/doctor_registration");
            }}
          >
            Doctor Registration
          </button>

          <button
            className="bg-white text-black font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white shadow-md"
            onClick={() => {
              navigate("/patient_registration");
            }}
          >
            Patient Registration
          </button>

          <button
            className="bg-white text-black font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white shadow-md"
            onClick={() => {
              navigate("/diagnostic_registration");
            }}
          >
            Diagnostics Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
