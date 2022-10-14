import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { fetchUserInfoAsync } from 'expo-auth-session';

function LoginScreen({navigation}) {
  const [open, setOpen] = useState(false)
  //const [name, setName] = useState()
  //const [age, setAge] = useState(0);

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
      setOpen(true)
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
        
        //TODO: utilize this email address
      }
      fetchData()
     
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
        //onPress={() => navigation.navigate("BottomTabs")}
      />
      <Modal visible={open}>
          <Text style={styles.center}>Dripcheck collects certain data about the user, such as uploaded photos, email addresses, and liked posts. Do you consent to this collection of data?</Text>
            <Button
              title="Agree"
              //onPress={() => setOpen(true)}
              onPress={() => {setOpen(false); navigation.navigate("BottomTabs")}}
             />
             <Button
              title="Disagree"
              onPress={() => setOpen(false)}
              //onPress={() => navigation.navigate("BottomTabs")}
             />
          </Modal>
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
    center: {
    flex: 1,
    //justifyContent: 'flex-end',
    marginTop: 200
    }
});

export default LoginScreen;

