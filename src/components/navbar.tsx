import React, { useState } from "react";
import styles from './navbar.module.css';

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
    className={styles.navLink}
  >
    {children}
    <span className={styles.arrow}>
      {isOpen ? '▼' : '▶'}
    </span>
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
    <div className={styles.dropdown}>
      {options.map((option) => (
        <div 
          key={option.id} 
          className={styles.checkboxContainer}
          onClick={() => {
            const newOptions = options.map(opt =>
              opt.id === option.id ? { ...opt, checked: !opt.checked } : opt
            );
            onChange(newOptions);
          }}
        >
          <div className={`${styles.customCheckbox} ${option.checked ? styles.checked : ''}`} />
          <span className={styles.checkboxLabel}>{option.label}</span>
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
      className={styles.navbar}>
      <div className={styles.navLeft}>
        <img 
          src="http://localhost:3002/assets/Passport-logo-RGB.svg"
          alt="Passport Logo" 
          className={styles.logo}
        />
        <div className={styles.dropdownContainer}>
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
        <div className={styles.dropdownContainer}>
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
        <div className={styles.dropdownContainer}>
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
        <div className={styles.dropdownContainer}>
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
      </div>
      <div className={styles.navRight}>
        <button
          className={styles.extractorButton}
          onClick={() => {
            if (window.location.port === "3000") {
              window.location.href = "/extractor";
            } else {
              window.location.href = "http://localhost:3001";
            }
          }}
        >
          <svg className={styles.extractIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
          </svg>
          Extract Data
        </button>
      </div>
    </nav>
    );
  }
}

export default Navbar;
