import React from 'react';
import { AddQuarterlyCalculation } from '../views/calculations/AddQuarterlyCalculation';
import { AddYearlyCalculation } from '../views/calculations/AddYearlyCalculation';
import { AllCompaniesList } from '../views/calculations/AllCompaniesList';

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/add_yearly_calculation', name: 'Add Yealy Calculation', element: AddYearlyCalculation },
  { path: '/add_quarterly_calculation', name: 'Add Quarterly Calculation', element: AddQuarterlyCalculation },
  { path: '/all_companies', name: 'All companies list', element: AllCompaniesList },
];

export default routes;
