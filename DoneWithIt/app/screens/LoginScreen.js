import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Linking from 'expo-linking';
import { fetchUserInfoAsync } from 'expo-auth-session';

function LoginScreen({navigation}) {
  const [request, resp, promptAsync] = Google.useAuthRequest({
    expoClientId: '680747377509-nhf0jt64eghn93bcmanicj7a2aqok75q.apps.googleusercontent.com',
    scopes: [
      'profile',
      'email',
      'openid',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]
  });
  React.useEffect(() => {
    if (resp?.type === 'success') {
      const token = resp.authentication.accessToken;
      async function fetchData() {
        
        let response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          method: 'GET',
          headers: {
          Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        })
        let data = await response.json();
        console.log(data.email);
      }
      fetchData()
      
      //2
      
      
      
      navigation.navigate("BottomTabs");
     
    }
  }, [resp]);
    return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
    disabled={!request}
    title="Login"
    onPress={() => {
      promptAsync();
    }}
  />
    </View>
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

export default LoginScreen;

