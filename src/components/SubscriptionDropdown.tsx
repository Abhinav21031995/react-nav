import React from 'react';
import styles from './navbar.module.css';
import RadioButton from 'shared_ui/RadioButton';
import { SharedComponentWrapper } from './SharedComponentWrapper';

interface SubscriptionProps {
  show: boolean;
  selectedValue?: string;
  onChange: (value: string) => void;
}

const subscriptionOptions = [
  { value: 'paid', label: 'Paid Subscription' },
  { value: 'free', label: 'Free Subscription' }
];

const SubscriptionDropdown: React.FC<SubscriptionProps> = ({ 
  show, 
  selectedValue,
  onChange 
}) => {
  if (!show) return null;

  return (
    <div className={`${styles.dropdown} ${styles.radioGroup}`}>
      <div className={styles.checkboxContainer}>
        <SharedComponentWrapper>
          <RadioButton
            name="subscription-type"
            options={subscriptionOptions}
            selectedValue={selectedValue}
            onChange={onChange}
            variant="primary"
          />
        </SharedComponentWrapper>
      </div>
    </div>
  );
};

export default SubscriptionDropdown;
