import React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
//import {Avatar, Button} from 'react-native-paper'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import {Ionicons} from '@expo/vector-icons'
import UploadImage from '../utilities/UploadImage';


function ProfileScreen() {
    return (
    <View style={styles.container}>
     <UploadImage/>
     <Text style={{marginVertical:20,fontSize:16}}>Profile</Text>
      <StatusBar style="auto" />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    profileAvatar: {
      width: 150,
      height: 150,
      borderRadius: 150/2,
      backgroundColor: "E1E2E6",
      justifyContent: 'center',
      alignItems: 'center'      
    }
});

export default ProfileScreen;

