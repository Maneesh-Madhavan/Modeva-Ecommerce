import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(77, 59, 76, 0.8)", // #4D3B4C with opacity
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    backgroundColor: "#997db0", // soft purple
    color: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 0 20px #A293AE", // muted lavender glow
    textAlign: "center",
  },
  closeBtn: {
    backgroundColor: "#4D3B4C",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem",
  }
};

export default function CompanyNav() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => setModalContent(type);
  const closeModal = () => setModalContent(null);

  const modalTexts = {
    about: "Modeva is your trusted fashion destination, committed to quality and style.",
    delivery: "We offer fast and reliable delivery worldwide with easy tracking options.",
    privacy: "Your privacy is our priority. We ensure your data is safe and secure.",
  };

  return (
    <>
      <nav className="flex flex-col gap-2 text-gray-700">
        <NavLink to="/" className="hover:text-purple-700">Home</NavLink>
        <button onClick={() => openModal("about")} className="text-left hover:text-purple-700">
          About Us
        </button>
        <button onClick={() => openModal("delivery")} className="text-left hover:text-purple-700">
          Delivery
        </button>
        <button onClick={() => openModal("privacy")} className="text-left hover:text-purple-700">
          Privacy Policy
        </button>
      </nav>

      {modalContent && (
        <div style={modalStyles.overlay} onClick={closeModal}>
          <div
            style={modalStyles.content}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2 className="text-2xl font-semibold mb-4">{modalContent.charAt(0).toUpperCase() + modalContent.slice(1)}</h2>
            <p>{modalTexts[modalContent]}</p>
            <button style={modalStyles.closeBtn} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
