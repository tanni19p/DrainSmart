import { useState } from 'react';

import NavBar from "./components/Navbar.jsx";
import Footer from './components/Footer.jsx';

import HomePage from './pages/HomePage.jsx';
import RiskMapPage from './pages/RiskMapPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import CitizenPage from './pages/CitizenPage.jsx';
import AboutPage from './pages/AboutPage.jsx';


const App = () => {
  const [activeView, setActiveView] = useState('home');

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar activeView={activeView} setActiveView={setActiveView} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeView === 'home' && <HomePage setActiveView={setActiveView} />}
        {activeView === 'map' && <RiskMapPage />}
        {activeView === 'analytics' && <AnalyticsPage />}
        {activeView === 'admin' && <AdminPage />}
        {activeView === 'citizen' && <CitizenPage />}
        {activeView === 'about' && <AboutPage />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
