import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import AppRoutes from './routes';
import Navbar from './components/Navbar';
import useLocationStore from './components/LocationSelector/locationStore';
import './App.css';

function App() {
  const { initializeLocations, allLocations } = useLocationStore();

  // Initialize location store on app start
  useEffect(() => {
    if (allLocations.length === 0) {
      initializeLocations();
    }
  }, [allLocations.length, initializeLocations]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
