import React, { useState } from "react";
import styles from './navbar.module.css';
import Button from "shared_ui/Button";
import Checkbox from "shared_ui/Checkbox";
import RadioButton from "shared_ui/RadioButton";
import { SharedComponentWrapper } from './SharedComponentWrapper';

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
        >
          <SharedComponentWrapper>
            <Checkbox
              label={option.label}
              checked={option.checked}
              color="primary"
              onChange={(checked: boolean) => {
                const newOptions = options.map(opt =>
                  opt.id === option.id ? { ...opt, checked } : opt
                );
                onChange(newOptions);
              }}
            />
          </SharedComponentWrapper>
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
  showSubscriptionDropdown: boolean;
  selectedSubscription?: string;
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
        showEconomiesDropdown: false,
        showSubscriptionDropdown: false
      });
    }
  };

  state: NavbarState = {
    showIndustriesDropdown: false,
    showChannelsDropdown: false,
    showCompaniesDropdown: false,
    showEconomiesDropdown: false,
    showSubscriptionDropdown: false,
    selectedSubscription: 'free',
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

  toggleDropdown = (dropdown: 'industries' | 'channels' | 'companies' | 'economies' | 'subscription') => {
    const dropdownMap = {
      industries: 'showIndustriesDropdown',
      channels: 'showChannelsDropdown',
      companies: 'showCompaniesDropdown',
      economies: 'showEconomiesDropdown',
      subscription: 'showSubscriptionDropdown'
    };
    
    this.setState(prevState => ({
      showIndustriesDropdown: dropdown === 'industries' ? !prevState.showIndustriesDropdown : false,
      showChannelsDropdown: dropdown === 'channels' ? !prevState.showChannelsDropdown : false,
      showCompaniesDropdown: dropdown === 'companies' ? !prevState.showCompaniesDropdown : false,
      showEconomiesDropdown: dropdown === 'economies' ? !prevState.showEconomiesDropdown : false,
      showSubscriptionDropdown: dropdown === 'subscription' ? !prevState.showSubscriptionDropdown : false
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

  // Add a method to check if we're on the extractor page
  isExtractorPage = () => {
    // Check both the pathname and if there's a showExtractor query parameter
    return window.location.pathname === '/extractor' || 
           window.location.href.includes('showExtractor=true') ||
           document.querySelector('[data-extractor-page="true"]') !== null;
  };

  render() {
    const {
      showIndustriesDropdown,
      showChannelsDropdown,
      showCompaniesDropdown,
      showEconomiesDropdown,
      showSubscriptionDropdown,
      selectedSubscription,
      industriesOptions,
      channelsOptions,
      companiesOptions,
      economiesOptions
    } = this.state;
    
    const isOnExtractorPage = this.isExtractorPage();
    
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
        <div className={styles.dropdownContainer}>
          <NavLink
            onClick={() => this.toggleDropdown('subscription')}
            isOpen={showSubscriptionDropdown}
          >
            Subscription
          </NavLink>
          {showSubscriptionDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.radioContainer}>
                <SharedComponentWrapper>
                  <RadioButton
                    name="subscription"
                    options={[
                      { value: 'free', label: 'Free' },
                      { value: 'premium', label: 'Premium' },
                      { value: 'enterprise', label: 'Enterprise' }
                    ]}
                    selectedValue={selectedSubscription}
                    onChange={(value) => this.setState({ selectedSubscription: value })}
                    variant="primary"
                  />
                </SharedComponentWrapper>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.navRight}>
        {isOnExtractorPage && (
          <button
            className={styles.backButton}
            onClick={() => {
              // Dispatch event to notify about navigation
              const event = new CustomEvent('navigate', {
                detail: { path: '/', clearExtractor: true }
              });
              window.dispatchEvent(event);
              
              // Update URL without refresh
              if (window.history && window.history.pushState) {
                window.history.pushState({}, '', '/');
              }
            }}
          >
            <svg className={styles.backIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825L13.425 18.6L12 20Z" fill="currentColor"/>
            </svg>
            Back to Home
          </button>
        )}
        {!isOnExtractorPage && (
          <SharedComponentWrapper>
            <Button
              variant="primary"
              size="medium"
              label="Extract Data"
              onClick={() => {
                // Dispatch event to notify about navigation
                const event = new CustomEvent('navigate', {
                  detail: { path: '/extractor', showExtractor: true }
                });
                window.dispatchEvent(event);
                
                // Update URL without refresh
                if (window.history && window.history.pushState) {
                  window.history.pushState({}, '', '/extractor');
                }
              }}
            />
          </SharedComponentWrapper>
        )}
      </div>
    </nav>
    );
  }
}

export default Navbar;
