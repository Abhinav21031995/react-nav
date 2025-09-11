import React from 'react';
import styles from './sharedComponent.module.css';
import './SharedComponentWrapper.css';

interface SharedComponentWrapperProps {
  children: React.ReactNode;
}

export const SharedComponentWrapper: React.FC<SharedComponentWrapperProps> = ({ children }) => {
  return (
    <div className={styles.sharedComponentWrapper}>
      {children}
    </div>
  );
};
