import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import { useNavigate } from "react-router-dom";
import "../CSS/DoctorRegistration.css";
import NavBar from "./NavBar";

const DiagnosticRegistry = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [diagnosticAddress, setDiagnosticAddress] = useState("");
  const [diagnosticName, setDiagnosticName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [diagnosticLocation, setDiagnosticLocation] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DiagnosticRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          setContract(contractInstance);
        } catch (error) {
          console.error("User denied access to accounts.");
        }
      } else {
        console.log("Please install MetaMask extension");
      }
    };

    init();
  }, []);

  const handleRegister = async () => {
    if (
      !diagnosticAddress ||
      !diagnosticName ||
      !hospitalName ||
      !diagnosticLocation ||
      !email ||
      !hhNumber ||
      !password ||
      !confirmPassword
    ) {
      alert(
        "You have missing input fields. Please fill in all the required fields."
      );
      return;
    }

    // Password validation: minimum length
    if (password.length < 8) {
      setPassword("");
      setConfirmPassword("");
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPassword("");
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError(""); // Clear email error if valid
    }

    try {
      const web3 = new Web3(window.ethereum);

      const networkId = await web3.eth.net.getId();

      const contract = new web3.eth.Contract(
        DiagnosticRegistration.abi,
        DiagnosticRegistration.networks[networkId].address
      );

      const isRegDoc = await contract.methods
        .isRegisteredDiagnostic(hhNumber)
        .call();

      if (isRegDoc) {
        alert("Diagnostic already exists");
        return;
      }

      await contract.methods
        .registerDiagnostic(
          diagnosticName,
          hospitalName,
          diagnosticLocation,
          email,
          hhNumber,
          password // Include password in the function call
        )
        .send({ from: diagnosticAddress });

      alert("Diagnostic registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the diagnostic.");
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  const cancelOperation = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center p-4 bg-white font-sans serif">
        <div className="w-full max-w-2xl">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl text-gray-800 mb-6 font-bold text-center">
              Diagnostic Registration
            </h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="diagnosticAddress">
                  Wallet Public Address
                </label>
                <input
                  id="diagnosticAddress"
                  name="diagnosticAddress"
                  type="text"
                  required
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                  value={diagnosticAddress}
                  onChange={(e) => setDiagnosticAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="diagnosticName">
                  Diagnostic Center Name
                </label>
                <input
                  id="diagnosticName"
                  name="diagnosticName"
                  type="text"
                  required
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                  value={diagnosticName}
                  onChange={(e) => setDiagnosticName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="hospitalName">
                  Hospital Name
                </label>
                <input
                  id="hospitalName"
                  name="hospitalName"
                  type="text"
                  required
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="diagnosticLocation">
                  Location
                </label>
                <input
                  type="text"
                  id="diagnosticLocation"
                  name="diagnosticLocation"
                  value={diagnosticLocation}
                  onChange={(e) => setDiagnosticLocation(e.target.value)}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200 ${
                    emailError && "border-red-500"
                  }`}
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="hhNumber">
                  HH Number
                </label>
                <input
                  id="hhNumber"
                  name="hhNumber"
                  type="text"
                  required
                  className={`mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200 ${hhNumberError && "border-red-500"}`}
                  value={hhNumber}
                  onChange={handlehhNumberChange}
                />
                {hhNumberError && (
                  <p className="text-red-500 text-sm mt-1">{hhNumberError}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200 ${
                    passwordError && "border-red-500"
                  }`}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200 ${
                    confirmPasswordError && "border-red-500"
                  }`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                )}
              </div>
            </form>

              <div className="mb-3 flex justify-center space-x-10">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-1/3 py-2 px-4 bg-[#000080] text-white rounded-full hover:bg-[#000080] transition duration-200"
                >
                Register
                </button>
  
                <button
                  type="button"
                  onClick={cancelOperation}
                  className="w-1/3 py-2 px-4 bg-[#800000] text-white rounded-full hover:bg-[#800000] transition duration-200"
                >
                Cancel
                </button>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticRegistry;
