import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import {insertNewUser, userExists, getCurrentDate, getAllOutfits} from '../utilities/requestData'
function LoadingScreen({navigation}) {
        return (
                
                <View style={styles.container}>
                  <Image style={styles.image} source={require("../assets/logo.png")} />
                  <Text> Loading User Data...</Text>
                    <StatusBar style="auto" />
                </View>
            
            );
}

async function handleLogin(){
    global.allAddedTags = [];
    //console.log("LoginScreen: called userExists");
    let previousData = await userExists(global.userEmail)
    if(previousData == false) {
      //console.log("LoginScreen: called insertNewUser");
      global.accountDate = getCurrentDate();
      global.outfitArray = -1;
      insertNewUser(global.userEmail, global.displayName, 0, 0);
    } else {
      //Utilize previousData to load user's stuff
      global.accountDate = JSON.parse(JSON.stringify(previousData)).dateCreated
      let outfits = await getAllOutfits(global.userEmail);
      var obj = JSON.parse(JSON.stringify(outfits));
      var res = [];
      for(var i in obj) {
          if(obj[i] != null){
            res.push(obj[i]);
          }
      }
      if(res.length != 0){
        
        let arr = new Array(res.length);
        for(var i = 0; i < res.length; i++){
          let created = res[i].dateCreated;
          let tags = res[i].tags;
          let imageString = res[i].imageString;
          let outfitName = res[i].outfitName; 
          let description = res[i].description
          let id = res[i]._id
          let outfit = {
            id: id,
            description: description,
            name: outfitName,
            date: created,
            image: imageString,
            tags: tags
          };
          arr.push(outfit);
        }
      global.outfitArray = arr;
      console.log("Added old outfits");
      } else {
        global.outfitArray = -1
      }
    }
    global.ready = 1;
    console.log("ready")
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#daecf5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
  flex: 1,
  //justifyContent: 'flex-end',
  marginTop: 200
  },
  image: {
    marginBottom: 60,
  }
});

export default LoadingScreen;