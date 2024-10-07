import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";
import { useNavigate } from "react-router-dom";
import "../CSS/DoctorRegistration.css";
import NavBar from "./NavBar";

const DoctorRegistry = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [doctorAddress, setDoctorAddress] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalLocation, setHospitalLocation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [specializationError, setSpecializationError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [designationError, setDesignationError] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DoctorRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DoctorRegistration.abi,
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
      !doctorAddress ||
      !doctorName ||
      !hospitalName ||
      !hospitalLocation ||
      !dateOfBirth ||
      !gender ||
      !email ||
      !hhNumber ||
      !specialization ||
      !department ||
      !designation ||
      !workExperience ||
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
        DoctorRegistration.abi,
        DoctorRegistration.networks[networkId].address
      );

      const isRegDoc = await contract.methods
        .isRegisteredDoctor(hhNumber)
        .call();

      if (isRegDoc) {
        alert("Doctor already exists");
        return;
      }

      await contract.methods
        .registerDoctor(
          doctorName,
          hospitalName,
          dateOfBirth,
          gender,
          email,
          hhNumber,
          specialization,
          department,
          designation,
          workExperience,
          password 
        )
        .send({ from: doctorAddress });

      alert("Doctor registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the doctor.");
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

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    setSpecialization(value);
    if (value === "Other") {
      setSpecializationError("");
    }
  };

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setDepartment(value);
    if (value === "Other") {
      setDepartmentError("");
    }
  };

  const handleDesignationChange = (e) => {
    const value = e.target.value;
    setDesignation(value);
    if (value === "Other") {
      setDesignationError("");
    }
  };

  const cancelOperation = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center p-4 bg-white font-sans serif">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl text-gray-900 mb-6 font-bold text-center">
            Doctor Registration
          </h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <form className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block font-semibold text-gray-700" htmlFor="doctorAddress">
                Wallet Public Address
              </label>
              <input
                id="doctorAddress"
                name="doctorAddress"
                type="text"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={doctorAddress}
                onChange={(e) => setDoctorAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="doctorName">
                Full Name
              </label>
              <input
                id="doctorName"
                name="doctorName"
                type="text"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="hospitalName">
                Hospital Name
              </label>
              <input
                id="hospitalName"
                name="hospitalName"
                type="text"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="hospitalLocation">
                Hospital Location
              </label>
              <input
                id="hospitalLocation"
                name="hospitalLocation"
                type="text"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={hospitalLocation}
                onChange={(e) => setHospitalLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="hhNumber">
                HH Number
              </label>
              <input
                id="hhNumber"
                name="hhNumber"
                type="text"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={hhNumber}
                onChange={handlehhNumberChange}
              />
              {hhNumberError && (
                <p className="text-red-500 text-sm">{hhNumberError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="specialization">
                Specialization
              </label>
              <input
                id="specialization"
                name="specialization"
                type="text"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={specialization}
                onChange={handleSpecializationChange}
              />
              {specializationError && (
                <p className="text-red-500 text-sm">{specializationError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="department">
                Department
              </label>
              <input
                id="department"
                name="department"
                type="text"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={department}
                onChange={handleDepartmentChange}
              />
              {departmentError && (
                <p className="text-red-500 text-sm">{departmentError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="designation">
                Designation
              </label>
              <input
                id="designation"
                name="designation"
                type="text"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={designation}
                onChange={handleDesignationChange}
              />
              {designationError && (
                <p className="text-red-500 text-sm">{designationError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="workExperience">
                Work Experience (years)
              </label>
              <input
                id="workExperience"
                name="workExperience"
                type="number"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-2 p-2 w-full text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition duration-200"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
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

export default DoctorRegistry;
