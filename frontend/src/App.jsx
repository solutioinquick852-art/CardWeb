import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Hero from './Hero';
import Home from './Home';
import Intro from './Intro';
import Plugins from './Plugins';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');

  // 檢查 localStorage 中的登入狀態
  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);
      setIsAdminLoggedIn(true);
      setAdminUsername(auth.username);
    }
  }, []);

  const handleLogin = (username) => {
    setIsAdminLoggedIn(true);
    setAdminUsername(username);
    localStorage.setItem('adminAuth', JSON.stringify({ username }));
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUsername('');
    localStorage.removeItem('adminAuth');
    window.location.href = '/card_admin';
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/card_admin"
              element={
                isAdminLoggedIn ? (
                  <AdminDashboard username={adminUsername} onLogout={handleLogout} />
                ) : (
                  <AdminLogin onLogin={handleLogin} />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
