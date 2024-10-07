import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <NavBar />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 font-sans">
        <div className="space-y-8 mt-[-50px] w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-10">

          <h1 className="text-2xl font-semibold text-center text-black mb-6">Login</h1>

          <button
            className="bg-white text-black font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white shadow-md"
            onClick={() => {
              navigate("/doctor_login");
            }}
          >
            Doctor Login
          </button>

          <button
            className="bg-white text-black font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white shadow-md"
            onClick={() => {
              navigate("/patient_login");
            }}
          >
            Patient Login
          </button>

          <button
            className="bg-white text-black font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white shadow-md"
            onClick={() => {
              navigate("/diagnostic_login");
            }}
          >
            Diagnostic Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
