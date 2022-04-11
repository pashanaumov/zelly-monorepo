import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../Auth/Login';
import { RegisterScreen } from '../Auth/Register';
import { Companies } from '../Companies/Companies';
import { Dashboard } from '../Dashboard/Dashboard';
import { DashboardMain } from '../Dashboard/DashboardMain';
import { Settings } from '../Settings/Settings';
import { MainContent } from './MainContent';

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

export const MainAppRouter = () => (
  <Routes>
    <Route path="/" element={<MainContent />} />
    <Route path="login" element={<LoginScreen />} />
    <Route path="register" element={<RegisterScreen />} />
    <Route path="dashboard" element={<Dashboard />}>
      <Route index element={<DashboardMain />} />
      <Route path="about" element={<About />} />
    </Route>
    <Route path="settings" element={<Settings />} />
    <Route path="companies" element={<Companies />} />
  </Routes>
);
