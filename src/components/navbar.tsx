import React from "react";
import { config } from "../config";

interface DropdownOption {
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
      margin: "0 12px",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#1976d2",
      padding: "8px 16px",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: 500,
      position: "relative",
      transition: "all 0.2s ease",
      borderRadius: "4px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#f0f7ff";
      e.currentTarget.style.color = "#0056b3";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = "#1976d2";
    }}
  >
    {children}
    {isOpen ? (
      <span style={{ fontSize: "12px", marginTop: "2px" }}>▼</span>
    ) : (
      <span style={{ fontSize: "12px", marginTop: "2px" }}>▶</span>
    )}
  </button>
);

interface DropdownProps {
  options: DropdownOption[]; 
  onChange: (options: DropdownOption[]) => void;
  show: boolean;
}

const Dropdown = ({ options, onChange, show }: DropdownProps) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: "0",
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "8px 0",
        minWidth: "250px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        zIndex: 1000,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        animation: "fadeIn 0.2s ease-out"
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .checkbox-container {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .checkbox-container:hover {
            background-color: #f5f9ff;
          }
          .custom-checkbox {
            width: 18px;
            height: 18px;
            border: 2px solid #1976d2;
            border-radius: 4px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          }
          .custom-checkbox.checked {
            background-color: #1976d2;
          }
          .checkbox-label {
            font-size: 14px;
            color: #333;
            font-weight: 500;
          }
          .checkmark {
            color: white;
            font-size: 12px;
            display: none;
          }
          .custom-checkbox.checked .checkmark {
            display: block;
          }
        `}
      </style>
      {options.map((option) => (
        <div 
          key={option.id} 
          className="checkbox-container"
          onClick={() => {
            const newOptions = options.map(opt =>
              opt.id === option.id ? { ...opt, checked: !opt.checked } : opt
            );
            onChange(newOptions);
          }}
        >
          <div className={`custom-checkbox ${option.checked ? 'checked' : ''}`}>
            <span className="checkmark">✓</span>
          </div>
          <span className="checkbox-label">{option.label}</span>
        </div>
      ))}
    </div>
  );
}

interface NavbarState {
  showIndustriesDropdown: boolean;
  showChannelsDropdown: boolean;
  showCompaniesDropdown: boolean;
  showEconomiesDropdown: boolean;
  industriesOptions: DropdownOption[];
  channelsOptions: DropdownOption[];
  companiesOptions: DropdownOption[];
  economiesOptions: DropdownOption[];
  drinksOptions: DropdownOption[];
}

class Navbar extends React.Component<{}, NavbarState> {
  private navRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (this.navRef.current && !this.navRef.current.contains(event.target as Node)) {
      this.setState({
        showIndustriesDropdown: false,
        showChannelsDropdown: false,
        showCompaniesDropdown: false,
        showEconomiesDropdown: false
      });
    }
  };

  state: NavbarState = {
    showIndustriesDropdown: false,
    showChannelsDropdown: false,
    showCompaniesDropdown: false,
    showEconomiesDropdown: false,
    companiesOptions: [
      { id: '1', label: 'Microsoft', checked: false },
      { id: '2', label: 'Apple', checked: false },
      { id: '3', label: 'Amazon.com', checked: false },
      { id: '4', label: 'Google (Alphabet)', checked: false }
    ],
    industriesOptions: [
      { id: '1', label: 'Appliances and Electronics', checked: false },
      { id: '2', label: 'Food and Nutrition', checked: false },
      { id: '3', label: 'Health and Beauty', checked: false },
      { id: '4', label: 'Home Products', checked: false }
    ],
    channelsOptions: [
      { id: '1', label: 'Digital Shopper', checked: false },
      { id: '2', label: 'E-Commerce', checked: false },
      { id: '3', label: 'Loyalty', checked: false },
      { id: '4', label: 'Retails', checked: false }
    ],
    economiesOptions: [
      { id: '1', label: 'Business Dynamics', checked: false },
      { id: '2', label: 'Cities', checked: false },
      { id: '3', label: 'Commodities', checked: false },
      { id: '4', label: 'EFT', checked: false }
    ],
    drinksOptions: [
      { id: '1', label: 'Beer', checked: false }
    ]
  };

  toggleDropdown = (dropdown: 'industries' | 'channels' | 'companies' | 'economies') => {
    const dropdownMap = {
      industries: 'showIndustriesDropdown',
      channels: 'showChannelsDropdown',
      companies: 'showCompaniesDropdown',
      economies: 'showEconomiesDropdown'
    };
    
    this.setState(prevState => ({
      showIndustriesDropdown: dropdown === 'industries' ? !prevState.showIndustriesDropdown : false,
      showChannelsDropdown: dropdown === 'channels' ? !prevState.showChannelsDropdown : false,
      showCompaniesDropdown: dropdown === 'companies' ? !prevState.showCompaniesDropdown : false,
      showEconomiesDropdown: dropdown === 'economies' ? !prevState.showEconomiesDropdown : false
    }));
  };

  updateOptions = (type: 'industries' | 'channels' | 'companies' | 'economies', newOptions: DropdownOption[]) => {
    switch(type) {
      case 'industries':
        this.setState({ industriesOptions: newOptions });
        break;
      case 'channels':
        this.setState({ channelsOptions: newOptions });
        break;
      case 'companies':
        this.setState({ companiesOptions: newOptions });
        break;
      case 'economies':
        this.setState({ economiesOptions: newOptions });
        break;
    }
  };

  render() {
    const {
      showIndustriesDropdown,
      showChannelsDropdown,
      showCompaniesDropdown,
      showEconomiesDropdown,
      industriesOptions,
      channelsOptions,
      companiesOptions,
      economiesOptions
    } = this.state;
    
    return (
    <nav 
      ref={this.navRef}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        background: "#f6f6f6",
        position: "relative"
      }}>
      <img 
        src="http://localhost:3002/assets/Passport-logo-RGB.svg"
        alt="Passport Logo" 
        style={{ width: 35, height: 35, marginRight: 10 }} 
      />
      <span style={{ fontWeight: "bold", marginRight: 40 }}>Passport</span>
      <div style={{ position: "relative" }}>
        <NavLink 
          onClick={() => this.toggleDropdown('industries')}
          isOpen={showIndustriesDropdown}
        >
          Industries
        </NavLink>
        <Dropdown
          options={industriesOptions}
          onChange={(newOptions) => this.updateOptions('industries', newOptions)}
          show={showIndustriesDropdown}
        />
      </div>
      <div style={{ position: "relative" }}>
        <NavLink 
          onClick={() => this.toggleDropdown('channels')}
          isOpen={showChannelsDropdown}
        >
          Channels
        </NavLink>
        <Dropdown
          options={channelsOptions}
          onChange={(newOptions) => this.updateOptions('channels', newOptions)}
          show={showChannelsDropdown}
        />
      </div>
      <div style={{ position: "relative" }}>
        <NavLink 
          onClick={() => this.toggleDropdown('companies')}
          isOpen={showCompaniesDropdown}
        >
          Companies
        </NavLink>
        <Dropdown
          options={companiesOptions}
          onChange={(newOptions) => this.updateOptions('companies', newOptions)}
          show={showCompaniesDropdown}
        />
      </div>
      <div style={{ position: "relative" }}>
        <NavLink 
          onClick={() => this.toggleDropdown('economies')}
          isOpen={showEconomiesDropdown}
        >
          Economies
        </NavLink>
        <Dropdown
          options={economiesOptions}
          onChange={(newOptions) => this.updateOptions('economies', newOptions)}
          show={showEconomiesDropdown}
        />
      </div>
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
        onClick={() => {
          if (window.location.port === "3000") {
            window.location.href = "/extractor";
          } else {
            window.location.href = "http://localhost:3001";
          }
        }}
      >
        Extractor
      </button>
    </nav>
    );
  }
}

export default Navbar;
