import React from "react";

const NavLink = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      margin: "0 10px",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#1976d2",
      padding: "5px 10px",
      textDecoration: "none",
      fontSize: "14px"
    }}
  >
    {children}
  </button>
);

const Navbar = () => {
  const handleNavigation = (path: string) => {
    // Handle navigation through a callback or state management
    console.log(`Navigate to: ${path}`);
  };

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      background: "#f6f6f6"
    }}>
      <img src="/Passport-logo-RGB.svg" alt="Passport Logo" style={{ width: 35, height: 35, marginRight: 10 }} />
      <span style={{ fontWeight: "bold", marginRight: 40 }}>Passport</span>
      <NavLink onClick={() => handleNavigation('/industry1')}>Industry1</NavLink>
      <NavLink onClick={() => handleNavigation('/industry2')}>Industry2</NavLink>
      <NavLink onClick={() => handleNavigation('/industry3')}>Industry3</NavLink>
      <NavLink onClick={() => handleNavigation('/industry4')}>Industry4</NavLink>
      <button
        style={{
          marginLeft: "auto",
          padding: "6px 18px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
        onClick={() => handleNavigation('/extractor')}
      >
        Extractor
      </button>
    </nav>
  );
};

export default Navbar;