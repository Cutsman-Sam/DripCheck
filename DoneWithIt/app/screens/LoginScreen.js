import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, Button, Modal } from 'react-native';

function LoginScreen({navigation}) {
  const [open, setOpen] = useState(false)
  //const [name, setName] = useState()
  //const [age, setAge] = useState(0);

    return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title="Login (replace)"
        onPress={() => setOpen(true)}
        //onPress={() => navigation.navigate("BottomTabs")}
      />
      <Modal visible={open}>
          <Text style={styles.center}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
             nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
            nulla pariatur</Text>
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

