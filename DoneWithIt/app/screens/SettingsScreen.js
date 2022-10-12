import React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View } from 'react-native';

function CalendarScreen(props) {
    return (
    <View style={styles.container}>
      <Text>Settings Tab Body (replace)</Text>
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
});

export default CalendarScreen;
