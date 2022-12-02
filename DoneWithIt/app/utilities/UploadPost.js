import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, ScrollView, FlatList, Image } from "react-native";
import {
  Post,
  Card,
  UserImg,
  UserInfo,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
} from "../styles/postStyle";

import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import {updateUser, getCurrentDate, addNewOutfit} from "../utilities/requestData";

/**
 * function to add a new outfit to the closet
 * @param {} o_name 
 * @param {*} o_image 
 * @param {*} o_tag 
 */
 function saveOutfitToCloset(o_name, o_image, o_tag) {
    for(let i = 0; i < global.outfitArray.length; i++) {
      if(global.outfitArray[i] != null && global.outfitArray[i].image == o_image) {
        console.error("Outfit already saved to your closet!");
        return;
      }
    }
    
    //outfit JSON object
    let outfit = {
      id: "",
      description: "",
      name: o_name,
      date: getCurrentDate(),
      image: o_image,
      tags: o_tag,
      lastWorn: "0000-00-00"
    };
    //add to global outfit array
    global.outfitArray.push(outfit);
  
    //add to DB
    global.outfitArray[global.outfitArray.length - 1].id = addNewOutfit(global.userEmail, o_name, "", o_image, o_tag);
  
    //make sure closet reloads
    //global.closetLoaded = null;
  }

function updateFollowers(userName){
    if(global.followingUsernames == "") {
        global.followingUsernames = " " + userName;
    } else if (global.followingUsernames.includes(userName)) {
        return;
    } else {
      global.followingUsernames = global.followingUsernames + ", " + userName;
    }
    updateUser(global.userEmail, global.displayName, global.accountDate, global.calendarStreak, 
        "00-00-0000", global.oCount, global.pfp64, "undefined",global.followingUsernames);
}

const uploadPost = ({ item }) => {

    const [isSaved, setIsSaved] = React.useState(false);

  saveIcon = isSaved ? "heart" : "heart-outline";
  saveIconColor = isSaved ? "#2e64e5" : "#333";

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

//  if(isSaved == true) {  //FIX: update saves globally
//    item.saves = item.saves + 1;
//     //global.postArray[id].saves = global.postArray[id].saves + 1;
//     saveOutfitToCloset(item.userName + "'s Post", item.postImg, item.tags);        
//   }

  if (item.saves == 1) {
    saveText = "1 Save";
  } else if (item.saves > 1) {
    saveText = item.saves + " Saves";
  } else {
    saveText = "Save";
  }



  return (
    <Card>
      <UserInfo>
        <UserImg source={{ uri: "data:image/png;base64," + item.userImg }} />
        <UserInfoText>
          <UserName> {item.userName} </UserName>
          <PostTime> {item.postTime} </PostTime>
        </UserInfoText>
        <Button onPress={() => {updateFollowers(item.userName)}} >Follow</Button>
      </UserInfo>
      <PostText> {item.post} </PostText>
      <PostImg source={{ uri: "data:image/png;base64," + item.postImg }} />

      <InteractionWrapper>
        <Interaction active={item.saved}>
        <Ionicons onPress={() => {saveOutfitToCloset(item.userName + "'s Post", item.postImg, item.tags); setIsSaved(true)}} name={saveIcon} size={25} color={saveIconColor}/>
          <InteractionText active={item.saved}>{saveText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="pricetags" size={25} onPress={() => {setVisible(true)}}/>
          <InteractionText>Tags</InteractionText>
          <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
          <Dialog.Title textAlign="center" >Tags</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
                {item.tags}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
        </Portal>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default uploadPost;
