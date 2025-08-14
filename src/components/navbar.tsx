import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExtractorModal from "./extractorModel";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <nav style={{
      display: "flex", alignItems: "center", padding: "10px 20px", background: "#f6f6f6"
    }}>
  <img src="/Passport-logo-RGB.svg" alt="Passport Logo" style={{ width: 35, height: 35, marginRight: 10 }} />
  <span style={{ fontWeight: "bold", marginRight: 40 }}>Passport</span>
      <Link to="/industry1" style={{ margin: "0 10px" }}>Industry1</Link>
      <Link to="/industry2" style={{ margin: "0 10px" }}>Industry2</Link>
      <Link to="/industry3" style={{ margin: "0 10px" }}>Industry3</Link>
      <Link to="/industry4" style={{ margin: "0 10px" }}>Industry4</Link>
      <button
        style={{ marginLeft: "auto", padding: "6px 18px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4 }}
        onClick={() => setModalOpen(true)}
      >
        Extractor
      </button>
      <ExtractorModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
};

export default Navbar;