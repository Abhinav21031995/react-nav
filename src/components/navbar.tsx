import React from "react";

interface Industry1Options {
  id: string;
  label: string;
  checked: boolean;
}

interface NavLinkProps {
  children: React.ReactNode;
  onClick: () => void;
  isOpen?: boolean;
}

const NavLink = ({ children, onClick, isOpen }: NavLinkProps) => (
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
      fontSize: "14px",
      position: "relative"
    }}
  >
    {children}
    {isOpen && <span style={{ marginLeft: "5px" }}>▼</span>}
  </button>
);

interface DropdownProps {
  options: Industry1Options[]; 
  onChange: (options: Industry1Options[]) => void;
  show: boolean;
}

const Dropdown = ({ options, onChange, show }: DropdownProps) => {

  if (!show) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "0",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        minWidth: "200px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000
      }}
    >
      {options.map((option) => (
        <div key={option.id} style={{ margin: "5px 0" }}>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={option.checked}
              onChange={() => {
                const newOptions = options.map(opt =>
                  opt.id === option.id ? { ...opt, checked: !opt.checked } : opt
                );
                onChange(newOptions);
              }}
              style={{ marginRight: "8px" }}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}

interface NavbarState {
  showIndustry1Dropdown: boolean;
  industry1Options: Industry1Options[];
}

class Navbar extends React.Component<{}, NavbarState> {
  state = {
    showIndustry1Dropdown: false,
    industry1Options: [
      { id: '1', label: 'Beer', checked: false },
      { id: '2', label: 'Alcoholic Drinks', checked: false },
      { id: '3', label: 'Wine', checked: false },
      { id: '4', label: 'Spirits', checked: false },
      { id: '5', label: 'Craft Beer', checked: false }
    ]
  };

  handleNavigation = (path: string) => {
    console.log(`Navigate to: ${path}`);
  };

  toggleIndustry1Dropdown = () => {
    this.setState(prevState => ({
      showIndustry1Dropdown: !prevState.showIndustry1Dropdown
    }));
  };

  updateIndustry1Options = (newOptions: Industry1Options[]) => {
    this.setState({ industry1Options: newOptions });
  };

  render() {
    const { showIndustry1Dropdown, industry1Options } = this.state;
    
    return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      background: "#f6f6f6",
      position: "relative"
    }}>
      <img src="/Passport-logo-RGB.svg" alt="Passport Logo" style={{ width: 35, height: 35, marginRight: 10 }} />
      <span style={{ fontWeight: "bold", marginRight: 40 }}>Passport</span>
      <div style={{ position: "relative" }}>
        <NavLink 
          onClick={this.toggleIndustry1Dropdown}
          isOpen={showIndustry1Dropdown}
        >
          Industry1
        </NavLink>
        <Dropdown
          options={industry1Options}
          onChange={this.updateIndustry1Options}
          show={showIndustry1Dropdown}
        />
      </div>
      <NavLink onClick={() => this.handleNavigation('/industry2')}>Industry2</NavLink>
      <NavLink onClick={() => this.handleNavigation('/industry3')}>Industry3</NavLink>
      <NavLink onClick={() => this.handleNavigation('/industry4')}>Industry4</NavLink>
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
        onClick={() => this.handleNavigation('/extractor')}
      >
        Extractor
      </button>
    </nav>
    );
  }
}

export default Navbar;
