import * as React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Switch } from 'react-native-paper';
import { useState } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons'

import {Post, Card, UserImg, UserInfo, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, ContentFilter} from '../styles/postStyle';

import UploadPost from '../utilities/UploadPost';

const Posts = [
  {
    id: '1',
    userName: global.displayName, //doesn't work properly? manually inputted into UploadPost
    userImg: require('../assets/blank-profile-pic.png'), //not showing
    postTime: '4 mins ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../closetimages/sample1.jpg'), //not showing
    saved: true,
    saves: '14',
    //comments: '5',
  },
  {
    id: '2',
    userName: global.displayName,
    userImg: require('../assets/blank-profile-pic.png'),
    postTime: '2 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../closetimages/sample2.jpg'),
    saved: false,
    saves: '8',
    //comments: '0',
  },
  {
    id: '3',
    userName: global.displayName,
    userImg: require('../assets/blank-profile-pic.png'),
    postTime: '1 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../closetimages/sample3.jpg'),
    saved: true,
    saves: '1',
    //comments: '0',
  },
];

//UPDATE SAVES
function InspirationScreen(props) {

  //use isEnabled to enable post filter
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  filter = isEnabled ? 'Following' : 'Everyone';
  
  return (
    <Post>
      <ContentFilter>
        <Text style={styles.text}>{filter}</Text>
        <Switch style={styles.switchButton}
        trackColor={{ false: "#2BFF00", true: "2BFF00"}}
        thumbColor={isEnabled ? "#2BFF00" : "#FD6868"}
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
      </ContentFilter>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={Posts}
          renderItem={({item}) => <UploadPost item={item}/>}
          keyExtractor={item=>item.id}
          
        />
        {/* <Card>
          <UserInfo>
            <UserImg source={require('../assets/blank-profile-pic.png')}/>
            <UserInfoText> 
              <UserName> {global.displayName} </UserName> 
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
              <UserName> {global.displayName} </UserName> 
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
              <UserName> {global.displayName} </UserName> 
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
        </Card> */}

      </ScrollView>
      <StatusBar style="auto" />
    </Post>

    
    );
}

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // scrollView: {
    //   //backgroundColor: 'orange',
    //   marginHorizontal: 10,
    // },
    text: {
       fontSize: 30,
       marginLeft: 30,
       marginTop: 5
    },
    switchButton: {
      marginLeft: 100,
      marginBottom: 15,
      marginTop: 10,
    }
});


export default InspirationScreen;

