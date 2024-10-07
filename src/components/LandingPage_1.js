import React, { useState } from "react";
import NavBar from "./NavBar";

import doctor from "./doctor.jpg";

function LandingPage() {
  return (
    <div>
      <NavBar />
      <div className="bg-white text-gray-900 font-sans min-h-screen flex flex-col items-center justify-center py-10">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Trusted Blockchain-Based EHR Solution</h1>
          <p className="text-lg font-medium">
            Empowering Healthcare with Secure, Decentralized Electronic Records - MediChain
          </p>
        </div>

        {/* Information Section */}
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          {/* Text Section */}
          <div className="text-center md:text-left">
            <p className="text-base leading-relaxed text-gray-700">
            MediChain is a revolutionary Electronic Health Record (EHR) system that leverages blockchain technology to redefine the way healthcare data is managed.
            By embedding security and decentralization into the core of its design, MediChain ensures that patient records are not only protected but also remain 
            under the complete control of individuals. Each medical record on MediChain is encrypted and immutable, guaranteeing that the data is secure from 
            unauthorized access and tampering.</p>

            <p className="text-base leading-relaxed text-gray-700">
            With MediChain, patients and healthcare providers can experience a new level of transparency and efficiency. The decentralized nature of the system
            means that healthcare data is distributed across a network, reducing the risk of data breaches and enhancing reliability. Additionally,
            MediChain provides seamless access to medical records from anywhere in the world, ensuring that crucial information is available whenever it is needed.</p>

            <p className="text-base leading-relaxed text-gray-700">
            Whether you are a patient seeking to manage your health records or a provider aiming to streamline access to vital information, MediChain offers a robust,
            user-centric solution. Embrace a future where healthcare data is secure, accessible, and fully in your control.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full flex justify-end pr-4">  {/* Adjusting the right gap with padding-right */}
            <img 
              src={doctor} 
              alt="Healthcare Illustration" 
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              style={{ maxWidth: '400px' }} // Optional: to control the max size of the image
            />
          </div>
        </div>

        {/* Features Section */}
        <h1 className="text-4xl font-bold mb-4">Specifications</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mb-12">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">Ease and Control</h2>
            <p className="text-base leading-relaxed">
              Complete control over your medical records. You can access your data anytime, ensuring security and privacy.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">Immutability</h2>
            <p className="text-base leading-relaxed">
              Deployed on the blockchain, ensuring that medical records cannot be altered, guaranteeing data integrity.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">Enhanced Security</h2>
            <p className="text-base leading-relaxed">
              Your data is encrypted and stored across multiple nodes, making it immune to unauthorized access and attacks.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default LandingPage;
