import * as React from 'react';
import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, View, ScrollView, FlatList, Image } from 'react-native';
import { Text, Button, Portal, Modal, TextInput, Switch } from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons'

import {Post, Card, UserImg, UserInfo, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, ContentFilter} from '../styles/postStyle';

import UploadPost from '../utilities/UploadPost';
import { set } from 'date-fns';
import { addNewPost } from '../utilities/requestData';



//UPDATE SAVES
function InspirationScreen(props) {

  //use isEnabled to enable post filter
  const [posts, setPosts] = React.useState([]);
  const [numPosts, setNumPosts] = React.useState(0);
  const [addingPostMenu, setAddingPostMenu] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [PostText, setPostText] = React.useState("");
  const [index, setIndex] = React.useState(0);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  filter = isEnabled ? 'Following' : 'Everyone';
  
  if(global.inspirationLoaded == null){
    for(var i = 0; i < global.postArray.length; i++){
      if(global.postArray[i] == null){
        continue;
      }
      let temp = posts;
      let post = {
        id: i + 1,
        userName: global.postArray[i].userName,
        userImg: global.postArray[i].profilePic,
        postTime: global.postArray[i].postTime,
        post: global.postArray[i].post,
        postImg: global.postArray[i].postImg,
        saves: global.postArray[i].saves
      }
      temp.push(post);
      let newPosts = numPosts + 1;
      setPosts(temp);
      setNumPosts(newPosts);
    }
    global.inspirationLoaded = true;
  }
  
  function addPost(id, profilePic, postText, postImg, saves, tags) {
    let temp = posts;
    let post = {
      id: id,
      userName: global.displayName,
      userImg: profilePic,
      postTime: new Date().toDateString(),
      post: postText,
      postImg: postImg,
      tags: tags,
      saves: saves
    }
    temp.push(post);
    let newPosts = numPosts + 1;
    setPosts(temp);
    setNumPosts(newPosts);
    addNewPost(post.userName, post.saves, post.postTime, post.postImg, post.post, post.postTime, post.userImg, post.tags);
  }

  function nextOutfit() {
    if (index < iter.length - 1) {
      setIndex(index + 1);
    }
  }

  // Shifts the outfit index over by one to the left, bounded
  function prevOutfit() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  let iter = [];
  for (let i = 0; i < global.outfitArray.length; i++) {
    if (global.outfitArray[i] !== undefined) {
      iter.push(global.outfitArray[i]);
    }
  }
  
  let c_outfit = iter[index]
  if(c_outfit != null){
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
        <FlatList
          data={posts}
          renderItem={({item}) => <UploadPost item={item}/>}
          keyExtractor={item=>item.id}
          showsVerticalScrollIndicator={false}
          
        />
      {/* </ScrollView> */}
      <StatusBar style="auto" />
    </Post>
    <Button style={styles.postButton} onPress={() => {setAddingPostMenu(true)}}>Post</Button>
    <Portal>
          
          <Modal visible={addingPostMenu} style={styles.modalMenu} dismissable={false}>
            
          
          <Text variant="headlineSmall" style={styles.outfitText}>Outfit Worn:</Text>
          <Text variant="bodyLarge" style={styles.outfitText}>{c_outfit.name}</Text>
          <View style={styles.buttonSpacing}></View>
          <Image
            style={styles.closetPicture}
            source={{ uri: "data:image/png;base64,"+ c_outfit.image }}
          />
          <View style={styles.buttonRowContainer}>
            <Button icon="arrow-left-bold" mode="contained-tonal" style={styles.navButtons} onPress={prevOutfit}>
              Previous
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="arrow-right-bold" mode="contained-tonal" style={styles.navButtons} onPress={nextOutfit} contentStyle={{flexDirection: 'row-reverse'}}>
              Next
            </Button>
          </View>

            <TextInput
              multiline={true}
              blurOnSubmit={true}
              label="Post Text"
              value={PostText}
              placeholder="These are winter boots..."
              onChangeText={PostText => setPostText(PostText)}
            />
            <View style={{flexDirection: "row"}}>
            <Button style={styles.postButton} onPress={() => {setAddingPostMenu(false); addPost(numPosts + 1, global.pfp64, PostText, c_outfit.image, 0,c_outfit.tags); setPostText("")}}>Post</Button>
            <Button style={styles.postButton} onPress={() => {setAddingPostMenu(false); setPostText("")}}>Cancel</Button>
            </View>
            <View style={styles.modalMargin}/>
            
          </Modal>
          
          
    </Portal>
    </View>
    
    );
  } else {
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
              <FlatList
                data={posts}
                renderItem={({item}) => <UploadPost item={item}/>}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false}
                
              />
            {/* </ScrollView> */}
            <StatusBar style="auto" />
          </Post>
          </View>
          
          );
  }
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fafc',
    alignItems: 'center',
    paddingTop: 50
  },
  modalMenu: {
    backgroundColor: '#ffffff',
    padding: 20
  },
  modalButton: {
    width: 190,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center"
  },
  buttonRowContainer: {
    alignSelf: "center",
    paddingTop: 10,
    flexDirection: "row",
  },
  buttonSpacing: {
    padding: 10,
  },
  outfitText: {
    alignSelf: "center",
    paddingTop: 10,
  },
  navButtons: {
    width: 120,
    borderWidth: 1,
    borderColor: "black",
  },
  closetPicture: {
    height: 280,
    width: 280,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center"
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
    modalMargin: {
      paddingBottom: 200
    },
    switchButton: {
      marginLeft: 100,
      marginBottom: 15,
      marginTop: 10,
    }
});


export default InspirationScreen;

