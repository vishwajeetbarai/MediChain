import React, { useState } from "react";
import Web3 from "web3";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import { useNavigate } from "react-router-dom";
import "../CSS/DoctorLoginPage.css";
import NavBar from "./NavBar";
import patient from "./PatientBGimg.jpg";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [hhNumberError, sethhNumberError] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);

  const handlehhNumberChange = (e) => {
    const inputhhNumber = e.target.value;
    const phoneRegex = /^\d{6}$/;
    if (phoneRegex.test(inputhhNumber)) {
      sethhNumber(inputhhNumber);
      sethhNumberError("");
    } else {
      sethhNumber(inputhhNumber);
      sethhNumberError("Please enter a 6-digit HH Number.");
    }
  };

  const handleCheckRegistration = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PatientRegistration.networks[networkId];
      const contract = new web3.eth.Contract(
        PatientRegistration.abi,
        deployedNetwork && deployedNetwork.address
      );

      const isRegisteredResult = await contract.methods
        .isRegisteredPatient(hhNumber)
        .call();
      setIsRegistered(isRegisteredResult);

      if (isRegisteredResult) {
        const isValidPassword = await contract.methods
          .validatePassword(hhNumber, password)
          .call();

        if (isValidPassword) {
          const patient = await contract.methods
            .getPatientDetails(hhNumber)
            .call();
          setPatientDetails(patient);
          navigate("/patient/" + hhNumber);
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("Patient not registered");
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      alert("An error occurred while checking registration.");
    }
  };

  const cancelOperation = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <div className="bg-white min-h-screen flex items-center p-9 font-sans text-gray-900">

        {/* Form Section */}
        <div className="w-1/2 max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
            Patient Login
          </h2>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700" htmlFor="hhNumber">
              HH Number
            </label>
            <input
              id="hhNumber"
              name="hhNumber"
              type="text"
              required
              className={`mt-2 p-3 w-full bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 ${
                hhNumberError && "border-red-500"
              }`}
              value={hhNumber}
              onChange={handlehhNumberChange}
            />
            {hhNumberError && (
              <p className="text-red-500 text-sm mt-1">{hhNumberError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-full bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleCheckRegistration}
              className="px-6 py-3 bg-[#000080] text-white font-semibold text-lg rounded-lg transition-colors duration-300 ease-in hover:bg-[#000080] active:bg-[#000080]"
            >
              Login
            </button>
            <button
              onClick={cancelOperation}
              className="px-6 py-3 bg-[#800000] text-white font-semibold text-lg rounded-lg transition-colors duration-300 ease-in hover:bg-[#800000] active:bg-[#800000] "
            >
              Close
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-1/2 flex justify-start ml-8">
          <img 
            src={patient} 
            alt="Healthcare Illustration" 
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default PatientLogin;
