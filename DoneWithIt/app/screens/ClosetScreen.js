import React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View } from 'react-native';

function ClosetScreen(props) {
    return (
    <View style={styles.container}>
      <View style={styles.shape_container}>
        <View style={styles.rectangle} />
      </View>
      <Text>Closet Tab Body (replace)</Text>
      <Button
              title="View and Edit Outfits"
              //onPress={() => setOpen(false)}
              //onPress={() => navigation.navigate("BottomTabs")}
             />
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
    shape_container: {
      height: 150,
      alignItems: "center",
      justifyContent: "center",
      margin: 10,
    },
    rectangle: {
      width: 200,
      height: 200 * 2,
      backgroundColor: '#EBDCDC'
    }
});

export default ClosetScreen;

