import React from 'react';
import { enableScreens } from 'react-native-screens';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import LoginScreen from './Auth/LoginScreen';
import { MainScreen } from './Main/MainScreen';
import RegisterScreen from './Auth/RegisterScreen';
import ForgotPasswordScreen from './Auth/ForgotPasswordScreen';
import Dashboard from './Main/Dashboard';

enableScreens();

type MainStackParamList = {
  Home: undefined;
};
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export interface MainStackNavigation<T extends keyof MainStackParamList> {
  navigation: NativeStackNavigationProp<MainStackParamList, T>;
}

export interface AuthStackNavigation<T extends keyof AuthStackParamList> {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>;
}

const AuthStackNav = createNativeStackNavigator();
const MainStackNav = createNativeStackNavigator();

function AuthStack() {
  return (
    <AuthStackNav.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <AuthStackNav.Screen name={'Login'} component={LoginScreen} />
      <AuthStackNav.Screen name={'Register'} component={RegisterScreen} />
      <AuthStackNav.Screen
        name={'ForgotPassword'}
        component={ForgotPasswordScreen}
      />
      <AuthStackNav.Screen name={'Dashboard'} component={Dashboard} />
    </AuthStackNav.Navigator>
  );
}

function MainStack() {
  return (
    <MainStackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStackNav.Screen name={'Home'} component={MainScreen} />
    </MainStackNav.Navigator>
  );
}

export { AuthStack, MainStack };
