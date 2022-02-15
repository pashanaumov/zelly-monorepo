import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './Auth/LoginScreen';
import { MainScreen } from './Main/MainScreen';
import RegisterScreen from './Auth/RegisterScreen';
import ForgotPasswordScreen from './Auth/ForgotPasswordScreen';
import Dashboard from './Main/Dashboard';
import { AppHeader } from './AppHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ProfileScreen } from './Main/Profile/ProfileScreen';

enableScreens();

type MainStackParamList = {
  Home: undefined;
};

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type AppStackParamList = MainStackParamList & AuthStackParamList;

export interface MainStackNavigation<T extends keyof MainStackParamList> {
  navigation: NativeStackNavigationProp<MainStackParamList, T>;
}

export interface AuthStackNavigation<T extends keyof AuthStackParamList> {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>;
}

export interface AppStackNavigation {
  navigation: NativeStackNavigationProp<AppStackParamList>;
}

const AuthStackNav = createNativeStackNavigator();
const MainStackNav = createNativeStackNavigator();
const ProfileStackNav = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// @TODO: make tMaterial Top Tabs Navigator for Android
// https://reactnavigation.org/docs/material-top-tab-navigator/

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
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <MainStackNav.Screen name={'Home'} component={MainScreen} />
    </MainStackNav.Navigator>
  );
}

function ProfileStack() {
  return (
    <ProfileStackNav.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStackNav.Screen name="Profile" component={ProfileScreen} />
    </ProfileStackNav.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: (props) => <AppHeader {...props} />,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'category';
          } else if (route.name === 'Profile') {
            iconName = 'home';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={MainStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export { AuthStack, MainTabs };
