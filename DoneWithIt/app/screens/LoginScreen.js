import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';



function LoginScreen({navigation}) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '680747377509-nhf0jt64eghn93bcmanicj7a2aqok75q.apps.googleusercontent.com'
  });
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      navigation.navigate("BottomTabs");
    }
  }, [response]);
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

