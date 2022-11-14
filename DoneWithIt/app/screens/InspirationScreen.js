import React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Switch } from 'react-native-paper';

const InspirationScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
}

function InspirationScreen(props) {
    return (
    <View style={styles.container}>
      <Switch
        //trackColor={{ false: "#767577", true:}}
      
      />

      <ScrollView style={styles.scrollView}>
      <Text style={styles.text}> 
        THIS IS A TEST FOR SCROLLING. 
        Place the definitions in an include (.h) file, and use the same file in both client and
        server software
        – Instead of defining individual hex values for each possible request and response,
        define a “response” bit and use it in the definition of message types 
        Having a separate function for communication allows extra messages to be sent that are
        not in the request queue (e.g., a control message to delete a disk)
      </Text>
      </ScrollView>
      <StatusBar style="auto" />
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
    scrollView: {
      backgroundColor: 'orange',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    }
});

export default InspirationScreen;

