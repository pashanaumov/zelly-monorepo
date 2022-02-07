import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../Auth/Login';
import { RegisterScreen } from '../Auth/Register';
import { Dashboard } from '../Dashboard/Dashboard';
import { Settings } from '../Settings/Settings';
import { MainContent } from './MainContent';

export const MainAppRouter = () => (
  <Routes>
    <Route path="/" element={<MainContent />} />
    <Route path="login" element={<LoginScreen />} />
    <Route path="register" element={<RegisterScreen />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="settings" element={<Settings />} />
  </Routes>
);
