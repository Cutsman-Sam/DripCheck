import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from './requestData';


//https://www.waldo.com/blog/add-an-image-picker-react-native-app

export default function UploadImage() {
//   const  checkForCameraRollPermission=async()=>{
//         const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           alert("Please grant camera roll permissions inside your system's settings");
//         }else{
//           console.log('Media Permissions are granted')
//         }
//   }
//   useEffect(() => {
//     checkForCameraRollPermission()
//   }, []);
  const [image, setImage] = useState(null);
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
      base64: true
    });
    if (!_image.cancelled) {
      setImage(_image.uri);
      global.currentImage = _image.uri;
      global.pfp64 = _image.base64;
      updateUser(global.userEmail, global.displayName, global.accountDate, global.calendarStreak, "00-00-0000", global.oCount, global.pfp64, "undefined",global.followingUsernames);
    }
  };
  if(String(image).indexOf(global.pfp64) == -1 && global.pfp64 != "undefined"){
    setImage("data:image/png;base64," + global.pfp64)
  } 
  return (
            <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Icon</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
  );
}



const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:150,
        width:150,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})

