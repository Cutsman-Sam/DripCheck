import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'

import { StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity, } from 'react-native';


function LoginScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/logo.png")} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setUsername(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#daecf5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      marginBottom: 60,
    },
    inputView: {
      backgroundColor: "#48ADE1",
      borderRadius: 30,
      width: "65%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    textInput: {
      height: 50,
      flex: 1,
      padding: 10,
    }
});

export default LoginScreen;

