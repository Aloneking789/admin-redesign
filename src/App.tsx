import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ServiceProviders from './pages/ServiceProviders';
import Categories from './pages/Categories';
import PendingServiceProviders from './pages/PendingProviders';
//import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/providers" element={<ServiceProviders />} />
              <Route path="/pendingproviders" element={<PendingServiceProviders/>} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;