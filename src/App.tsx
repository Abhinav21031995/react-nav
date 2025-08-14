
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/industry1" replace />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
