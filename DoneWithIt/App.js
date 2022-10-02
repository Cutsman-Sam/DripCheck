import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from './app/screens/ProfileScreen';
import CalendarScreen from './app/screens/CalendarScreen';
import ClosetScreen from './app/screens/ClosetScreen';
import InspirationScreen from './app/screens/InspirationScreen';

const Tab = createBottomTabNavigator();
Tab

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Closet" component={ClosetScreen} />
      <Tab.Screen name="Inspiration" component={InspirationScreen} />
    </Tab.Navigator>
  );
}

//View -> UIView
export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
