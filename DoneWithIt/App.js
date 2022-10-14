import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './app/screens/LoginScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import CalendarScreen from './app/screens/CalendarScreen';
import ClosetScreen from './app/screens/ClosetScreen';
import InspirationScreen from './app/screens/InspirationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 4,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#48ADE1',
    
    secondary: '#48ADE1',
    secondaryContainer: '#8fd4f7',
    tertiary: '#48ADE1',

    outline: '#48ADE1',
    background: '#FFFFFF'
  }
};

function ProfileStack() {
  return (
    <Stack.Navigator 
    initialRouteName={"Profile"}>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{}}/>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Calendar">
      <Tab.Screen name="ProfileStack" component={ProfileStack} 
        options={{tabBarIcon: () => (<Image source={require("./app/assets/icon-profile.jpg")} 
        style={{width: 32, height: 32}} />), title: "Profile", headerShown: false}}/>

      <Tab.Screen name="Calendar" component={CalendarScreen} 
        options={{tabBarIcon: () => (<Image source={require("./app/assets/icon-calendar.jpg")} 
        style={{width: 32, height: 32}} />)}}/>

      <Tab.Screen name="Closet" component={ClosetScreen} 
        options={{tabBarIcon: () => (<Image source={require("./app/assets/icon-closet.jpg")} 
        style={{width: 32, height: 32}} />)}}/>
        
      <Tab.Screen name="Inspiration" component={InspirationScreen} 
        options={{tabBarIcon: () => (<Image source={require("./app/assets/icon-inspiration.jpg")} 
        style={{width: 32, height: 32}} />)}}/>
    </Tab.Navigator>
  );
}


//View -> UIView
export default function App({navigation}) {
  
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName={"Login"}
      screenOptions={{headerBackVisible: false}}>
        <Stack.Screen name="Login" component={LoginScreen}
          options={{headerShown: false}}/>
        <Stack.Screen name="BottomTabs" component={BottomTabs} 
          options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}
