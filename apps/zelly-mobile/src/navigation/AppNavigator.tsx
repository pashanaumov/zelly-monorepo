import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './Auth/LoginScreen';
import { MainScreen } from './Main/MainScreen';
import RegisterScreen from './Auth/RegisterScreen';
import ForgotPasswordScreen from './Auth/ForgotPasswordScreen';
import Dashboard from './Main/Dashboard';
import { AppHeader } from './AppHeader';
import { ProfileScreen } from './Main/Profile/ProfileScreen';
import { UserCarbonFootprintScreen } from './Main/Profile/UserCarbonFootprintScreen';
import { UserCompaniesScreen } from './Main/Profile/UserCompaniesScreen';
import { UserTrendsScreen } from './Main/Profile/UserTrendsScreen';
import { UserForumsScreen } from './Main/Profile/UserForumsScreen';
import { UserEducationScreen } from './Main/Profile/UserEducationScreen';

enableScreens();

type MainStackParamList = {
  Home: undefined;
  UserCarbonFootprint: undefined;
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

const authStackOptions = {
  headerShown: false,
  gestureEnabled: false,
};

function AuthStack() {
  return (
    <AuthStackNav.Navigator screenOptions={authStackOptions}>
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
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <MainStackNav.Screen name={'HomeScreen'} component={MainScreen} />
    </MainStackNav.Navigator>
  );
}

function ProfileStack() {
  return (
    <ProfileStackNav.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerBackButtonMenuEnabled: true,
        header: (props) => {
          return (
            <AppHeader {...props} back={props.route.name !== 'ProfileScreen'} />
          );
        },
      }}>
      <ProfileStackNav.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStackNav.Screen
        options={{
          headerBackButtonMenuEnabled: true,
        }}
        name="UserCarbonFootprint"
        component={UserCarbonFootprintScreen}
      />
      <ProfileStackNav.Screen
        name="UserCompanies"
        component={UserCompaniesScreen}
      />
      <ProfileStackNav.Screen name="UserTrends" component={UserTrendsScreen} />
      <ProfileStackNav.Screen name="UserForums" component={UserForumsScreen} />
      <ProfileStackNav.Screen
        name="UserEducation"
        component={UserEducationScreen}
      />
    </ProfileStackNav.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgb(96, 38, 232)',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={MainStack} />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}

export { AuthStack, MainTabs };
