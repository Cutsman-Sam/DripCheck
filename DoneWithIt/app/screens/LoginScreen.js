import React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

function LoginScreen({navigation}) {
    return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title="Login (replace)"
        onPress={() => navigation.navigate("BottomTabs")}
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

