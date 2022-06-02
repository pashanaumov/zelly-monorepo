import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../Auth/Login';
import { RegisterScreen } from '../Auth/Register';
import { Calculator } from '../Calculator/Calculator';
import { Companies } from '../Companies/Companies';
import { ForumsDiscussions } from '../Dashboard/ForumsDiscussions';
import { Dashboard } from '../Dashboard/Dashboard';
import { DashboardMain } from '../Dashboard/DashboardMain';
import { Settings } from '../Settings/Settings';
import { MainContent } from './MainContent';
import { UserTrends } from '../Dashboard/UserTrends';
import { MyCompanies } from '../Companies/MyCompanies/MyCompanies';

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
    <Route path="profile" element={<Settings />} />
    <Route path="companies" element={<Companies />} />
    <Route path="my_companies" element={<MyCompanies />} />
    <Route path="calculator" element={<Calculator />} />
    <Route path="trends" element={<UserTrends />} />
    <Route path="forums" element={<ForumsDiscussions />} />
  </Routes>
);
