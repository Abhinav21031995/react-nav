import React, { useState } from "react";
import styles from './navbar.module.css';
import Button from "shared_ui/Button";
import Checkbox from "shared_ui/Checkbox";
import RadioButton from "shared_ui/RadioButton";
import { SharedComponentWrapper } from './SharedComponentWrapper';
import { Chipset, type ChipItem } from "shared_ui/Chipset";
import { Tooltip } from "shared_ui/Tooltip";
import { ProgressSpinner } from "shared_ui/ProgressSpinner";
import { Loader } from "shared_ui/Loader";
import { Input } from "shared_ui/Input";
import { Dialog } from "shared_ui/Dialog";
import { DatePicker } from "shared_ui/DatePicker";
import ExpansionPanel from "shared_ui/ExpansionPanel";
import { Tabs, Tab } from "shared_ui/Tabs";
import Select from "shared_ui/Select";

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
  return (
    <div className={`${styles.dropdown} ${show ? styles.show : ''}`}>
      <ExpansionPanel
        title="Expansion Panel"
        description="options"
        defaultExpanded={true}
      >
        <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '8px', paddingTop: '8px' }}>
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
      </ExpansionPanel>
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
  searchQuery: string;
  showDialog: boolean;
  selectedDate: string;
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
    searchQuery: '',
    showDialog: false,
    selectedDate: '',
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
            <Tooltip 
              label="Select your subscription type and manage features"
              position="right"
            >
              <span>Storybook</span>
            </Tooltip>
          </NavLink>
            <div className={`${styles.dropdown} ${showSubscriptionDropdown ? styles.show : ''}`}>
              {showSubscriptionDropdown && (
                <>
                  <SharedComponentWrapper>
                    <Tabs>
                      <Tab label="Subscription Plans">
                        <div className={styles.radioContainer} style={{ padding: '16px' }}>
                          <SharedComponentWrapper>
                            <Tooltip
                              label="Dropdown"
                              position="right"
                            >
                              <Tooltip label="Select  Dropdown ">
                                <Select
                                  options={[
                                    { value: 'free', label: 'Free Plan' },
                                    { value: 'premium', label: 'Premium Plan' },
                                    { value: 'enterprise', label: 'Enterprise Plan' }
                                  ]}
                                  value={selectedSubscription}
                                  placeholder="Select a plan"
                                  onChange={(value: string) => this.setState({ selectedSubscription: value })}
                                  appearance="outline"
                                />
                              </Tooltip>
                            </Tooltip>
                          </SharedComponentWrapper>
                          <div style={{ marginTop: '24px' }}>
                            <SharedComponentWrapper>
                              <Tooltip
                                label="Choose radio button"
                                position="right"
                              >
                                <Tooltip label="RadioButton selection">
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
                                </Tooltip>
                              </Tooltip>
                            </SharedComponentWrapper>
                          </div>
                        </div>
                      </Tab>
                      <Tab label="Features">
                        <div style={{ padding: '16px' }}>
                          <SharedComponentWrapper>
                            <Tooltip label="Search features...">
                              <Input
                                value={this.state.searchQuery}
                                placeholder="Search features..."
                                label="Feature Search"
                                onChange={(value) => this.setState({ searchQuery: value })}
                              />
                            </Tooltip>
                          </SharedComponentWrapper>
                          <div style={{ marginTop: '16px' }}>
                            <SharedComponentWrapper>
                              <Tooltip label="DatePicker Component ">
                                <DatePicker
                                  value={this.state.selectedDate}
                                  onChange={(value) => this.setState({ selectedDate: value })}
                                  placeholder="Select date"
                                  required
                                />
                              </Tooltip>
                            </SharedComponentWrapper>
                          </div>
                        </div>
                      </Tab>
                      <Tab label="Symbols">
                        <div style={{ padding: '16px' }}>
                          <div style={{ marginBottom: '24px' }}>
                            <SharedComponentWrapper>
                              <Tooltip label="Chipset Component">
                                <Chipset
                                  chips={[
                                    { id: 1, label: 'Current Plan', removable: false, selected: true },
                                    { id: 2, label: 'Premium Features', removable: true, selected: false },
                                    { id: 3, label: 'Enterprise Access', removable: true, selected: false },
                                  ]}
                                  selectable={true}
                                  removable={true}
                                  onRemove={(chip: ChipItem) => console.log('Removed chip:', chip)}
                                  onToggle={(chip: ChipItem) => console.log('Toggled chip:', chip)}
                                />
                              </Tooltip>
                            </SharedComponentWrapper>
                          </div>
                          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                            <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666', fontWeight: 500 }}>Progress Spinner Component</p>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center' }}>
                              <div>
                                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Indeterminate</p>
                                <Tooltip label="ProgressSpinner Component">
                                <ProgressSpinner 
                                  mode="indeterminate"
                                  color="primary"
                                  size={40}
                                />
                              </Tooltip>
                              </div>
                              <div>
                                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Determinate</p>
                                <ProgressSpinner 
                                  mode="determinate"
                                  color="accent"
                                  value={75}
                                  size={40}
                                />
                              </div>
                              <div>
                                <p style={{ marginBottom: '8px', fontSize: '14px' }}>Error State</p>
                                <ProgressSpinner 
                                  mode="indeterminate"
                                  color="warn"
                                  size={40}
                                />
                              </div>
                            </div>
                          </div>
                          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px' }}>
                            <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666', fontWeight: 500 }}>Passport Logo Loader Component</p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <Tooltip label="Loader Custom Passport">
                                <div style={{ color: '#0078D4' }}> {/* Microsoft blue color */}
                                  <Loader />
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px', textAlign: 'center' }}>
                            <Tooltip label="Dialog Component ">
                              <button
                                className={styles.dialogButton}
                                onClick={() => this.setState({ showDialog: true })}
                              >
                                Open Dialog
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </SharedComponentWrapper>
                </>
              )}
            </div>
            <Dialog
              isOpen={this.state.showDialog}
              onClose={() => this.setState({ showDialog: false })}
              onConfirm={() => {
                console.log('Dialog confirmed');
                this.setState({ showDialog: false });
              }}
              onCancel={() => {
                console.log('Dialog cancelled');
                this.setState({ showDialog: false });
              }}
              title="Subscription Change"
              message="Are you sure you want to change your subscription plan?"
              confirmText="Yes, Change Plan"
              cancelText="Cancel"
              type="info"
            />
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
