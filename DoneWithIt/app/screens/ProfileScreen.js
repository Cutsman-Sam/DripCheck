import React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
//import {Avatar, Button} from 'react-native-paper'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import {Ionicons} from '@expo/vector-icons'

handlePickAvatar = async () => {
  UserPermissions.getCameraPermission()

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3]
  })

  if(result.cancelled) {
    this.setState({ user: { ...this.state.user, avatar: result.uri}}) //figure this line out
  }
};

state = {
  user: {
    avatar: null
  },
};

function ProfileScreen(props) {
    return (
    <View style={styles.container}> 
      {/* <TouchableOpacity>
        <Ionicons 
        name="ios-add" 
        size={40} 
        color="FFF" 
        style={{marginTop: 6, marginLeft: 2}}
      ></Ionicons>
      this.handlePickAvatar
      </TouchableOpacity>   */}
     <TouchableOpacity>
      <Image 
        source={require('../assets/blank-profile-pic.png')} 
        //source={{uri: this.state.user.avatar}} 
        style={styles.profileAvatar}
        //style={{width: 150, height: 150, borderRadius: 150/2}}
       />
     </TouchableOpacity>
      <Text>Profile</Text>
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

