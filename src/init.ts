import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Initialize React in the global scope
if (typeof window !== 'undefined') {
    window.React = React;
    window.ReactDOM = ReactDOM;
}
