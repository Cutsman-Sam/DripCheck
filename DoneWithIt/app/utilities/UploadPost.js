import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet, View, ScrollView, FlatList, Image } from 'react-native';
import {Post, Card, UserImg, UserInfo, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText} from '../styles/postStyle';
import { Button, Modal, Text } from 'react-native-paper';
import { getCurrentDate,addNewOutfit } from './requestData';


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

const uploadPost = ({item}) => {

        const [isSaved, setIsSaved] = React.useState(false); //When isSaved is true, save outfit to closet

        const [isModalVisible, setIsModalVisible] = React.useState(false);
        const handleModal = () => setIsModalVisible(() => !isModalVisible);

        saveIcon = isSaved ? 'heart' : 'heart-outline';
        saveIconColor = isSaved ? '#2e64e5' : '#333';

        // if(isSaved == true) {  //FIX: update saves globally
        //     item.saves = item.saves + 1;
        //     //global.postArray[id].saves = global.postArray[id].saves + 1;
        //     saveOutfitToCloset(item.userName + "'s Post", item.postImg, item.tags);
            
        // }

        if(item.saves == 1) {
            saveText = '1 Save';
        } else if(item.saves > 1) {
            saveText = item.saves + ' Saves';
        } else {
            saveText = 'Save';
        }
       
    return(
        <Card>                  
          <UserInfo>                
            <UserImg source={{uri: "data:image/png;base64," + item.userImg}}/>
            <UserInfoText>               
              <UserName> {global.displayName} </UserName> 
              <PostTime> {item.postTime} </PostTime>
            </UserInfoText>                 
          </UserInfo>                
          <PostText> {item.post} </PostText>
          <PostImg source={{ uri: "data:image/png;base64,"+ item.postImg}} /> 

          <InteractionWrapper>  
          <Interaction active={item.saved}>
              <Ionicons onPress={() => {saveOutfitToCloset(item.userName + "'s Post", item.postImg, item.tags)}} name={saveIcon} size={25} color={saveIconColor}/>
              <InteractionText active={item.saved}>{saveText}</InteractionText> 
            </Interaction>          
            <Interaction>               
              <Ionicons name="pricetags" size={25} onPress={handleModal}/>
              {/* <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1}}>
                  <Text> This is for tags!</Text>
                  <Button title="Close" onPress={handleModal} />
                </View>
              </Modal> */}
              <InteractionText>Tags</InteractionText>
            </Interaction>          
          </InteractionWrapper> 
        </Card>
    );
}

export default uploadPost;