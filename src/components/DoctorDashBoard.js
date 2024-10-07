import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";

const DoctorDashBoardPage = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error, setError] = useState(null);

  // const doctorForm = () => {
  //   navigate("/doctor/"+hhNumber+"/doctorform");
  // };
  
  const viewPatientList = () => {
    navigate("/doctor/"+hhNumber+"/patientlist");
  };

  // const viewPatientRecords = () => {
  //   navigate("/doctor/"+hhNumber+"/doctorviewpatient");
  // };

  const viewDoctorProfile = () => {
    navigate("/doctor/"+hhNumber+"/viewdoctorprofile");
  };

  useEffect(() => {
    const init = async () => {
      // Check if Web3 is injected by MetaMask or any other provider
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DoctorRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DoctorRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);

          // Call the getDoctorDetails function of the smart contract
          const result = await contractInstance.methods.getDoctorDetails(hhNumber).call();
          setDoctorDetails(result);
        } catch (error) {
          console.error('Error initializing Web3 or fetching doctor details:', error);
          setError('Error initializing Web3 or fetching doctor details');
        }
      } else {
        console.error('Please install MetaMask extension');
        setError('Please install MetaMask extension');
      }
    };

    init();
  }, [hhNumber]);

  return (
    <div>
      <NavBar_Logout></NavBar_Logout>
      <div className="bg-white p-8 sm:p-10 h-screen flex justify-center items-center">
        <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full sm:w-2/3 lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">Doctor Dashboard</h2>
          {doctorDetails && (
            <p className="text-xl sm:text-2xl mb-10 text-center text-gray-700">
              Welcome{" "}
              <span className="font-bold text-[#00416A]">{doctorDetails[1]}!</span>
            </p>
          )}
          <div className="space-y-4 text-center">
            <button
              onClick={viewDoctorProfile}
              className="w-full px-6 py-3 bg-[#00416A] hover:bg-[#00416A] text-white rounded-lg focus:outline-none focus:ring focus:ring-[#00416A] transition duration-300"
            >
              View Profile
            </button>
            <button
              onClick={viewPatientList}
              className="w-full px-6 py-3 bg-[#00416A] hover:bg-[#00416A] text-white rounded-lg focus:outline-none focus:ring focus:ring-[#00416A] transition duration-300"
            >
              View Patient List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashBoardPage;
