import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../Auth/Login';
import { RegisterScreen } from '../Auth/Register';
import { MainContent } from './MainContent';

export const MainAppRouter = () => (
  <Routes>
    <Route path="/" element={<MainContent />} />
    <Route path="login" element={<LoginScreen />} />
    <Route path="register" element={<RegisterScreen />} />
  </Routes>
);
