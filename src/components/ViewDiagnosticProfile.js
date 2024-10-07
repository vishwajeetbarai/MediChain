import React, { useState, useEffect } from "react";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/PatientWritePermission.css";
import "../big_css/CreateEHR.css";
import NavBar_Logout from "./NavBar_Logout";

const ViewDiagnosticProfile = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [diagnosticDetails, setDiagnosticDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiagnosticDetails = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contract = new web3Instance.eth.Contract(
            DiagnosticRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          const result = await contract.methods.getDiagnosticDetails(hhNumber).call();
          setDiagnosticDetails(result);
        } else {
          setError("Please install MetaMask extension");
        }
      } catch (error) {
        console.error('Error retrieving diagnostic details:', error);
        setError('Error retrieving diagnostic details');
      }
    };

    fetchDiagnosticDetails();
  }, [hhNumber]);

  const cancelOperation = async () => {
    try {
      navigate("/diagnostic/" + hhNumber);
    } catch (error) {
      console.error("Error checking permission:", error);
    }
  };
  
  return (
    <div>
  <NavBar_Logout />
  <div className="bg-white min-h-screen p-8 flex justify-center items-center">
    <div className="w-full max-w-3xl bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
        Diagnostic's Profile
      </h1>
      {diagnosticDetails && (
        <div>
          <center>
            <p className="text-xl sm:text-2xl mb-3">
              Diagnostic Center Name :{" "}
              <span className="font-bold text-[#00416A]">{diagnosticDetails[1]}</span>
            </p>
            <p className="text-xl sm:text-2xl mb-3">
              Hospital Name :{" "}
              <span className="font-bold text-[#00416A]">{diagnosticDetails[2]}</span>
            </p>
            <p className="text-xl sm:text-2xl mb-3">
              Location :{" "}
              <span className="font-bold text-[#00416A]">{diagnosticDetails[3]}</span>
            </p>
            <p className="text-xl sm:text-2xl mb-3">
              Email-Id :{" "}
              <span className="font-bold text-[#00416A]">{diagnosticDetails[4]}</span>
            </p>
            <p className="text-xl sm:text-2xl mb-3">
              HH Number :{" "}
              <span className="font-bold text-[#00416A]">{hhNumber}</span>
            </p>
          </center>
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={cancelOperation}
          className="px-6 py-3 bg-[#00416A] text-white font-bold text-lg rounded-lg hover:bg-[#00416A] transition duration-300 ease-in-out transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>
);
};

export default ViewDiagnosticProfile;
