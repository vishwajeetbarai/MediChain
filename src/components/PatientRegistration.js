import React, { useState, useEffect } from "react";
import Web3 from "web3";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import { useNavigate } from "react-router-dom";
import "../CSS/PatientRegistration.css";
import NavBar from "./NavBar";

const PatientRegistry = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bg, setBloodGroup] = useState("");
  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = PatientRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            PatientRegistration.abi,
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
      !walletAddress ||
      !name ||
      !dateOfBirth ||
      !homeAddress ||
      !hhNumber ||
      !gender ||
      !bg ||
      !email ||
      !walletAddress ||
      !password ||
      !confirmPassword
    ) {
      alert(
        "You have missing input fields. Please fill in all the required fields."
      );
      return;
    }

    if (hhNumber.length !== 6) {
      alert(
        "You have entered a wrong HH Number. Please enter a 6-digit HH Number."
      );
      return;
    }

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

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateOfBirth)) {
      alert("Please enter Date of Birth in the format yyyy-mm-dd");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(
        PatientRegistration.abi,
        PatientRegistration.networks[networkId].address
      );

      const isRegPatient = await contract.methods
        .isRegisteredPatient(hhNumber)
        .call();

      if (isRegPatient) {
        alert("Patient already exists");
        return;
      }

      await contract.methods
        .registerPatient(
          walletAddress,
          name,
          dateOfBirth,
          gender,
          bg,
          homeAddress,
          email,
          hhNumber,
          password
        )
        .send({ from: walletAddress });

      alert("Patient registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the patient.");
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
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

  const cancelOperation = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center p-4 bg-white font-sans serif">
        <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl text-gray-800 mb-6 font-bold text-center">
            Patient Registration
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="walletAddress">
                  Wallet Public Address
                </label>
                <input
                  type="text"
                  id="walletAddress"
                  name="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="bg">
                  Blood Group
                </label>
                <select
                  id="bg"
                  name="bg"
                  required
                  value={bg}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="homeAddress">
                  Home Address
                </label>
                <input
                  type="text"
                  id="homeAddress"
                  name="homeAddress"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                />
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="hhNumber">
                  HH Number
                </label>
                <input
                  type="text"
                  id="hhNumber"
                  name="hhNumber"
                  value={hhNumber}
                  onChange={handlehhNumberChange}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                />
                {hhNumberError && (
                  <p className="text-red-600 text-sm">{hhNumberError}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                />
                {emailError && (
                  <p className="text-red-600 text-sm">{emailError}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                />
                {passwordError && (
                  <p className="text-red-600 text-sm">{passwordError}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-bold text-gray-800" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-400 rounded-md hover:bg-gray-300 transition duration-200"
                />
                {confirmPasswordError && (
                  <p className="text-red-600 text-sm">{confirmPasswordError}</p>
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
  );
};

export default PatientRegistry;
