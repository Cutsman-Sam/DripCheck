import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'

import {Post, Card, UserImg, UserInfo, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText} from '../styles/postStyle';


const uploadPost = ({item}) => {

        saveIcon = item.saved ? 'heart' : 'heart-outline';
        saveIconColor = item.saved ? '#2e64e5' : '#333';

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
            <UserImg source={item.UserImg}/>
            <UserInfoText> 
              <UserName> {global.displayName} </UserName> 
              <PostTime> {item.postTime} </PostTime>
            </UserInfoText>
          </UserInfo>
          <PostText> {item.post} </PostText>
          <PostImg source={item.PostImg} /> 

          <InteractionWrapper>
          <Interaction active={item.saved}>
              <Ionicons name={saveIcon} size={25} color={saveIconColor}/>
              <InteractionText active={item.saved}>{saveText}</InteractionText> 
            </Interaction>
            <Interaction>
              <Ionicons name="pricetags" size={25}/>
              <InteractionText>Tags</InteractionText>
            </Interaction>
          </InteractionWrapper>
        </Card>
    );
}

export default uploadPost;