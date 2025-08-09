import React, { useState } from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => setModalContent(type);
  const closeModal = () => setModalContent(null);

  const modalTexts = {
    about: {
      heading: "About Modeva",
      subheading: "Redefining Elegance",
      text: "At Modeva, we believe fashion is a form of expression. Our mission is to empower individuals with thoughtfully curated styles that blend sophistication and comfort. Whether you're dressing for work, events, or everyday moments, Modeva ensures your wardrobe speaks for you.",
    },
    delivery: {
      heading: "Delivery Information",
      subheading: "Fast & Reliable",
      text: "We partner with top logistics providers to ensure your orders reach you swiftly and safely. Track your shipments in real-time and enjoy flexible delivery options across regions. Free shipping is available on select purchases.",
    },
    privacy: {
      heading: "Privacy Policy",
      subheading: "Your Trust Matters",
      text: "Your privacy is a top priority at Modeva. We securely handle your personal information and never share data with third parties without consent. From secure payments to encrypted communication, your data is in safe hands.",
    },
  };

  return (
   <div className="bg-gray-50 w-full">
  <div className="max-w-7xl mx-auto px-6 py-10 mt-40">
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm justify-center">
      <div>
        <img src={assets.logoFooter} className="mb-5 w-32" alt="" />
        <p className="w-full md:w-2/3 text-gray-600">
          Modeva is your go-to fashion destination. We offer carefully curated styles with quality craftsmanship. Experience effortless elegance in every piece.
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5 text-[#4D3B4C]">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li><a href="/" className="hover:text-[#997db0]">Home</a></li>
          <li><button onClick={() => openModal("about")} className="text-left hover:text-[#997db0] focus:outline-none">About us</button></li>
          <li><button onClick={() => openModal("delivery")} className="text-left hover:text-[#997db0] focus:outline-none">Delivery</button></li>
          <li><button onClick={() => openModal("privacy")} className="text-left hover:text-[#997db0] focus:outline-none">Privacy Policy</button></li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5 text-[#4D3B4C]">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+1-2323-456</li>
          <li>contact@modeva.com</li>
        </ul>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-6">
    <hr />
    <p className="py-5 text-sm text-center">
      Copyright 2025@modeva.com - All Rights Reserved
    </p>
  </div>

  {/* Modal for pop up */}
  {modalContent && (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 sm:p-8 relative">
        <h2 className="text-2xl font-semibold text-[#4D3B4C] mb-2">{modalTexts[modalContent].heading}</h2>
        <h3 className="text-lg font-medium text-[#997db0] mb-4">{modalTexts[modalContent].subheading}</h3>
        <p className="text-[#A293AE] text-sm leading-relaxed">
          {modalTexts[modalContent].text}
        </p>
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-[#4D3B4C] font-bold text-xl"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default Footer;