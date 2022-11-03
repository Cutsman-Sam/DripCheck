import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addNewOutfit } from './requestData';
//https://www.waldo.com/blog/add-an-image-picker-react-native-app

export default function UploadOutfit() {
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
      aspect: [4,4],
      quality: .2,
      base64: true,
    });
    //console.log(JSON.stringify(_image));
    if (!_image.cancelled) {
      setImage(_image.uri);
      global.outfitBase64 = _image.base64;
      //console.log(global.outfitBase64);
    }
  };
  return (
            <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Upload'} Outfit</Text>
                            <AntDesign style={{paddingLeft: 8}} name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
  );
}



const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        //marginTop: 15,
        height:250,
        width:250,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:20,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'10%',
    },
    uploadBtn:{
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center'
    }
})

