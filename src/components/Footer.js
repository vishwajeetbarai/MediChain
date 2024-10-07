import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#00416A] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Contact Information */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="font-bold text-xl mb-2">Contact Information</h3>
            <p><span className="font-bold">Address:</span> ABC Street, Mumbai, India</p>
            <p><span className="font-bold">Phone:</span> +91 93456 79890</p>
            <p><span className="font-bold">Email:</span> medichain@company.com</p>
          </div>

          {/* Useful Links */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="font-bold text-lg text-white mb-2">Useful Links</h3>
            <ul className="text-white">
              <li><a href="http://localhost:3000/AboutPage" className="hover:text-white">About Us</a></li>
              <li><a href="http://localhost:3000/doctor_login" className="hover:text-white">Doctor Login</a></li>
              <li><a href="http://localhost:3000/patient_login" className="hover:text-white">Patient Login</a></li>
            </ul>
          </div>

          {/* Other Links */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="font-bold text-lg text-white mb-2">Other Links</h3>
            <ul className="text-white">
              
              <li><a href="https://www.hhs.gov/sites/default/files/ocr/privacy/hipaa/understanding/consumers/privacy-security-electronic-records.pdf#:~:text=The%20federal%20government%20put%20in%20place%20the%20Health,specific%20protections%20to%20safeguard%20your%20electronic%20health%20information."className="hover:text-white">Privacy Policy</a></li>
              <li><a href="https://www.tebra.com/theintake/medical-deep-dives/patient-care/ehr-explained-a-guide-to-electronic-healthcare-systems" className="hover:text-white">Terms of Service</a></li>
              <li><a href="https://www.glassdoor.co.in/Job/electronic-health-records-analyst-jobs-SRCH_KO0,33.htm" className="hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg text-white mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://instagram.com/company" className="text-white hover:text-white">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://facebook.com/company" className="text-white hover:text-white">
                <FontAwesomeIcon icon={faFacebookF} size="2x" />
              </a>
              <a href="https://www.linkedin.com/company/ehrassociation/" className="text-white hover:text-white">
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm text-white mt-8">
          <p>&copy; 2024 MediChain. All rights reserved.</p>
          <p>Developed by Vishwajeet Barai</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
