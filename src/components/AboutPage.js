import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";


const AboutUs = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white text-gray-800">
      <NavBar />

      {/* Main Content Section */}
      <div className="px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 leading-relaxed">
            {/* About MediChain Section */}
            <div>
              <h2 className="text-2xl font-medium text-black">About MediChain: Transforming Healthcare with Blockchain Technology</h2>
              <p className="mt-2 text-lg">
                MediChain is a cutting-edge Electronic Health Record (EHR) system that leverages the power of blockchain technology to ensure the secure, decentralized, and efficient management of healthcare records. Our goal is to empower both patients and healthcare providers by providing a trustworthy platform where medical data is protected, immutable, and easily accessible when needed.
              </p>
            </div>

            {/* Why Blockchain for Healthcare Section */}
            <div>
              <h2 className="text-2xl font-medium text-black">Why Blockchain for Healthcare?</h2>
              <p className="mt-2 text-lg">
                Healthcare data is one of the most sensitive forms of personal information, requiring high levels of security, privacy, and accuracy. MediChain addresses the challenges faced by traditional EHR systems with key benefits such as:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-lg">
                <li><strong>Data Integrity:</strong> Once entered, medical records cannot be altered, preserving the integrity of patient data.</li>
                <li><strong>Decentralization:</strong> Records are stored across multiple decentralized nodes, reducing risks of single points of failure.</li>
                <li><strong>Security:</strong> Encryption and distributed storage make data highly secure and resistant to unauthorized access.</li>
                <li><strong>Transparency:</strong> Every access or update is logged on the blockchain, ensuring complete auditability.</li>
              </ul>
            </div>

            {/* Benefits for Patients Section */}
            <div>
              <h2 className="text-2xl font-medium text-black">Benefits for Patients</h2>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-lg">
                <li><strong>Ownership of Data:</strong> Patients manage their healthcare information and decide who can access it.</li>
                <li><strong>Global Accessibility:</strong> Access records from anywhere, ensuring the best care even when traveling.</li>
                <li><strong>Streamlined Care:</strong> Faster, more accurate access to data allows healthcare providers to make timely, informed decisions.</li>
              </ul>
            </div>

            {/* Benefits for Healthcare Providers Section */}
            <div>
              <h2 className="text-2xl font-medium text-black">Benefits for Healthcare Providers</h2>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-lg">
                <li><strong>Reduced Administrative Burden:</strong> Minimized time spent requesting, sharing, and verifying patient records.</li>
                <li><strong>Enhanced Data Security:</strong> Access to secure, accurate, and up-to-date medical records.</li>
                <li><strong>Cost Efficiency:</strong> Lower costs for data storage, management, and transfer.</li>
              </ul>
            </div>

            {/* Use Cases Section */}
            <div>
              <h2 className="text-2xl font-medium text-black">Use Cases</h2>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-lg">
                <li><strong>Cross-Provider Data Sharing:</strong> Patients can share medical records with multiple healthcare providers seamlessly.</li>
                <li><strong>Patient-Provider Consent Management:</strong> Patients can grant access to their records through smart contracts.</li>
                <li><strong>Insurance and Billing:</strong> Automates claims processing and ensures accurate billing with verified records.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button Section */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-[#00416A] text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:bg-[#00416A] shadow-md mb-10"
          onClick={goToHome}
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
