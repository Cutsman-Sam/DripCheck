import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'

import {Post, Card, UserImg, UserInfo, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText} from '../styles/postStyle';


const uploadPost = ({item}) => {

        likeIcon = item.liked ? 'heart' : 'heart-outline';
        likeIconColor = item.liked ? '#2e64e5' : '#333';

        if(item.likes == 1) {
            likeText = '1 Like';
        } else if(item.likes > 1) {
            likeText = item.likes + ' Likes';
        } else {
            likeText = 'Like';
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
          <Interaction active={item.liked}>
              <Ionicons name={likeIcon} size={25} color={likeIconColor}/>
              <InteractionText active={item.liked}>{likeText}</InteractionText> 
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