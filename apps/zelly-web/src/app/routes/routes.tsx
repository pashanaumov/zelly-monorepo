import { LoginScreen } from '../screens/Auth/Login';
import { Route } from './Route';

export const routes: Array<Route> = [
  {
    path: '/sign_in',
    name: 'Login',
    component: LoginScreen,
  },
];
