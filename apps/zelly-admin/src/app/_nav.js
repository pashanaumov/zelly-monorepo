import { cilCompass, cilDrop, cilPencil, cilFlightTakeoff, cilSpeedometer, cilLibraryAdd } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'All companies',
    to: '/all_companies',
    icon: <CIcon icon={cilCompass} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add yearly calculation',
    to: '/add_yearly_calculation',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add quarterly calculation',
    to: '/add_quarterly_calculation',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add new company',
    to: '/add_new_company',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Edit company',
    to: '/edit_company',
    icon: <CIcon icon={cilFlightTakeoff} customClassName="nav-icon" />,
  },
];

export default _nav;
