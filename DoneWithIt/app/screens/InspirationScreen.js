import * as React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, View, ScrollView, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, Portal, Modal, TextInput, Switch } from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons'

import {Post, Card, UserImg, UserInfo, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, ContentFilter} from '../styles/postStyle';

import UploadPost from '../utilities/UploadPost';
import { set } from 'date-fns';


let Posts = [
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
let numPosts = Posts.length;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback 
  onPress={() => Keyboard.dismiss()}> {children}
  </TouchableWithoutFeedback>
  );
//UPDATE SAVES
function InspirationScreen(props) {

  //use isEnabled to enable post filter
  const [posts, setPosts] = React.useState([]);
  const [numPosts, setNumPosts] = React.useState(0);
  const [addingPostMenu, setAddingPostMenu] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [PostText, setPostText] = React.useState("");

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  filter = isEnabled ? 'Following' : 'Everyone';
  

  function addPost(id, profilePic, postText, postImg, saves){
    let temp = posts;
    let post = {
      id: id,
      userName: global.displayName,
      userImg: profilePic,
      postTime: new Date().toDateString(),
      post: postText,
      postImg: postImg,
      saves: saves
    }
    temp.push(post);
    let newPosts = numPosts + 1;
    setPosts(temp);
    setNumPosts(newPosts);
  }

  return (
<View style={styles.container}>
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
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <FlatList
          data={posts}
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

      {/* </ScrollView> */}
      <StatusBar style="auto" />
    </Post>
    <Button style={styles.postButton} onPress={() => {setAddingPostMenu(true)}}>Post</Button>
    <Portal>
          
          <Modal visible={addingPostMenu} style={styles.modalMenu} dismissable={false}>
            <TextInput
              multiline={true}
              blurOnSubmit={true}
              label="Post Text"
              value={PostText}
              placeholder="These are winter boots..."
              onChangeText={PostText => setPostText(PostText)}
            />
            <View style={{flexDirection: "row"}}>
            <Button style={styles.postButton} onPress={() => {setAddingPostMenu(false); addPost(numPosts + 1, "", PostText, "", 0)}}>Post</Button>
            <Button style={styles.postButton} onPress={() => {setAddingPostMenu(false)}}>Cancel</Button>
            </View>
            
          </Modal>
          
          
    </Portal>
    </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalButton: {
      width: 190,
      borderWidth: 1,
      borderColor: "black",
      alignSelf: "center"
    },
    modalMenu: {
      backgroundColor: '#ffffff',
      padding: 20
    },
    postButton: {
      borderWidth: 1,
      marginTop: 0,
      borderColor: "black",
    },
    scrollView: {
      //backgroundColor: 'orange',
      marginHorizontal: 10,
    },
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

