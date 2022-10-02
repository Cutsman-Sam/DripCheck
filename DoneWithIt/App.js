import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './app/screens/LoginScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import CalendarScreen from './app/screens/CalendarScreen';
import ClosetScreen from './app/screens/ClosetScreen';
import InspirationScreen from './app/screens/InspirationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{tabBarIcon: () => (<Image source={require("./app/assets/icon-profile.jpg")} 
        style={{width: 32, height: 32}} />)}}/>

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
    <NavigationContainer>

      <Stack.Navigator 
      initialRouteName={"Login"}
      screenOptions={{headerBackVisible: false}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="BottomTabs" component={BottomTabs}/>
      </Stack.Navigator>
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
