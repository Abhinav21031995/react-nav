
import React from 'react';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        {/* Add any static content or components that don't require routing */}
      </main>
    </div>
  );
}

export default App;
