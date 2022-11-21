import * as React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Switch } from 'react-native-paper';
import { useState } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons'

import {Post, Card, UserImg, UserInfo, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText} from '../styles/postStyle';


//UPDATE LIKES
function InspirationScreen(props) {

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  return (
    <Post>
      <Switch style={styles.switchButton}
        trackColor={{ false: "#2BFF00", true: "2BFF00"}}
        thumbColor={isEnabled ? "#2BFF00" : "#FD6868"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <ScrollView style={styles.scrollView}>
        <Card>
          <UserInfo>
            <UserImg source={require('../assets/blank-profile-pic.png')}/>
            <UserInfoText> 
              <UserName> {global.userEmail} </UserName> 
              <PostTime>4 hours ago</PostTime>
            </UserInfoText>
          </UserInfo>
          <PostText> This is a test 1</PostText>
          <PostImg source={require('../closetimages/sample1.jpg')} />
          <InteractionWrapper>
          <Interaction active>
              <Ionicons name="heart" size={25} color="#2e64e5"/>
              <InteractionText active>Like</InteractionText> 
            </Interaction>
            <Interaction>
              <Ionicons name="pricetags" size={25}/>
              <InteractionText>Tags</InteractionText>
            </Interaction>
          </InteractionWrapper>
        </Card>

        <Card>
          <UserInfo>
            <UserImg source={require('../assets/blank-profile-pic.png')}/>
            <UserInfoText> 
              <UserName> {global.userEmail} </UserName> 
              <PostTime>6 hours ago</PostTime>
            </UserInfoText>
          </UserInfo>
          <PostText> This is a test 2</PostText>
          <PostImg source={require('../closetimages/sample2.jpg')} />
          <InteractionWrapper>
            <Interaction active>
              <Ionicons name="heart" size={25} color="#2e64e5"/>
              <InteractionText active>Like</InteractionText>
            </Interaction>
            <Interaction>
              <Ionicons name="pricetags" size={25}/>
              <InteractionText>Tags</InteractionText>
            </Interaction>
          </InteractionWrapper>
        </Card>

        <Card>
          <UserInfo>
            <UserImg source={require('../assets/blank-profile-pic.png')}/>
            <UserInfoText> 
              <UserName> {global.userEmail} </UserName> 
              <PostTime>8 hours ago</PostTime>
            </UserInfoText>
          </UserInfo>
          <PostText> This is a test 3</PostText>
          <PostImg source={require('../closetimages/sample3.jpg')} />
          <InteractionWrapper>
          <Interaction active>
              <Ionicons name="heart" size={25} color="#2e64e5"/>
              <InteractionText active>Like</InteractionText>
            </Interaction>
            <Interaction>
              <Ionicons name="pricetags" size={25}/>
              <InteractionText>Tags</InteractionText>
            </Interaction>
          </InteractionWrapper>
        </Card>

      </ScrollView>
      <StatusBar style="auto" />
    </Post>

    
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      //backgroundColor: 'orange',
      marginHorizontal: 10,
    },
    text: {
      fontSize: 42,
    },
    switchButton: {
      marginLeft: 150,
      marginBottom: 10,
      marginTop: 10 
    }
});

export default InspirationScreen;

