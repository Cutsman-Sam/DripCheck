import * as React from "react";
import { StatusBar } from "expo-status-bar"; //status-bar replaced with 'react'
import { StyleSheet, View, ScrollView, FlatList, Image } from "react-native";
import {
  Text,
  Button,
  Portal,
  Modal,
  TextInput,
  Switch,
} from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";

import { Post, ContentFilter } from "../styles/postStyle";

import UploadPost from "../utilities/UploadPost";
import { set } from "date-fns";
import { addNewPost, deletePostDB, updatePost } from "../utilities/requestData";
import { de } from "date-fns/locale";

//UPDATE SAVES
function InspirationScreen(props) {
  //use isEnabled to enable post filter
  const [posts, setPosts] = React.useState([]);
  const [numPosts, setNumPosts] = React.useState(0);
  const [addingPostMenu, setAddingPostMenu] = React.useState(false);
  const [editingPostMenu, setEditingPostMenu] = React.useState(false);
  const [specificPostMenu, setSpecificPostMenu] = React.useState(false);
  const [sortMenu, setSortMenu] = React.useState(false);
  const [sortingTag, setSortingTag] = React.useState("");
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [PostText, setPostText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [pidx, setPidx] = React.useState(0);
  const [hasPost, setHasPost] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  let filter = isEnabled ? "Following" : "Everyone";

  if (global.inspirationLoaded == null || global.toggle != isEnabled) {
    var shownPosts;
    global.toggle = isEnabled;
    if (isEnabled) {
      shownPosts = global.followingPosts;
    } else {
      shownPosts = global.postArray;
    }
    var count = 0;
    let temp = [];
    for (var i = 0; i < shownPosts.length; i++) {
      if (shownPosts[i] == null) {
        continue;
      }
      count++;
      let post = {
        id: i + 1,
        userName: shownPosts[i].userName,
        userImg: shownPosts[i].profilePic,
        postTime: shownPosts[i].postTime,
        post: shownPosts[i].post,
        postImg: shownPosts[i].postImg,
        saves: shownPosts[i].saves,
        tags: shownPosts[i].tags,
      };
      temp.push(post);
      if (post.userName === global.displayName && hasPost == false) {
        setHasPost(true);
      }
    }
    setNumPosts(count);
    setPosts(temp);
    global.inspirationLoaded = true;
  }

  function showModalSort() {
    setSortMenu(true);
  }

  // Removes a tag from an outfit's tag list if it is present.
  function sortByTag() {
    let tempArray = [];
    let addingTag = sortingTag;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].tags.includes(addingTag)) {
        tempArray.push(posts[i]);
      }
    }
    for (let i = 0; i < posts.length; i++) {
      if (!tempArray.includes(posts[i])) {
        tempArray.push(posts[i]);
      }
    }

    setPosts(tempArray);
  }

  // Removes a tag from an outfit's tag list if it is present.
  function sortBySaves() {
    let tempArray = [];
    for (let i = 0; i < outfitArray.length; i++) {
      if (!tempArray.includes(outfitArray[i])) {
        tempArray.push(outfitArray[i]);
      }
    }
    var tempOutfit;
    //tempArray is initialized
    for (let i = 0; i < tempArray.length - 1; i++) {
      for (let j = 0; j < tempArray.length - i - 1; j++) {
        if (tempArray[j].saves > tempArray[j + 1].saves) {
          //swap them
          tempOutfit = tempArray[j];
          tempArray[j] = tempArray[j + 1];
          tempArray[j + 1] = tempOutfit;
        }
      }
    }

    setPosts(tempArray);
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
      saves: saves,
    };
    global.postArray.push(post);
    global.myPostsArray.push(post);
    setHasPost(true);
    temp.push(post);
    let newPosts = numPosts + 1;
    setPosts(temp);
    setNumPosts(newPosts);
    addNewPost(
      post.userName,
      post.saves,
      post.postTime,
      post.postImg,
      post.post,
      post.postTime,
      post.userImg,
      post.tags
    );
  }
  function editPost(prevImg, prevPost, profilePic, postText, postImg, saves) {
    let temp = posts;

    var id;
    for (var i = 0; i < global.postArray.length; i++) {
      if (
        global.postArray[i].postImg === c_post.postImg &&
        global.postArray[i].post === c_post.post
      ) {
        id = i;
      }
    }
    let post = {
      id: id,
      userName: global.displayName,
      userImg: profilePic,
      postTime: new Date().toDateString(),
      post: postText,
      postImg: postImg,
      saves: saves,
      tags: global.postArray[id].tags,
    };
    temp.splice(id, 1, post);
    setPosts(temp);
    for (var i = 0; i < global.myPostsArray.length; i++) {
      if (global.myPostsArray[i] === c_post) {
        global.myPostsArray[i] = post;
      }
    }
    global.postArray[id] = post;
    updatePost(
      prevImg,
      prevPost,
      post.userName,
      saves,
      post.postTime,
      postImg,
      postText,
      post.postTime,
      profilePic,
      c_outfit.tags
    );
  }
  function deletePost() {
    // let my = [];
    // for (var i = 0; i < global.myPostsArray.length; i++) {
    //   if (global.myPostsArray[i] !== c_post) {
    //     my.push(global.myPostsArray[i]);
    //   }
    // }
    // global.myPostsArray = my;
    var id;
    for (var i = 0; i < global.postArray.length; i++) {
      if (
        global.postArray[i].postImg === c_post.postImg &&
        global.postArray[i].post === c_post.post &&
        global.postArray[i].userName === global.displayName
      ) {
        id = i;
      }
    }
    let temp = posts;
    temp.splice(id, 1);
    global.postArray.splice(id, 1);
    global.myPostsArray.splice(pidx, 1);
    setPidx(0);
    setPosts(temp);
    deletePostDB(global.displayName, c_post.postImg, c_post.post);
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
  let arr = [];
  for (let i = 0; i < global.myPostsArray.length; i++) {
    if (global.myPostsArray[i] !== undefined) {
      arr.push(global.myPostsArray[i]);
    }
  }

  let iter = [];
  for (let i = 0; i < global.outfitArray.length; i++) {
    if (global.outfitArray[i] !== undefined) {
      iter.push(global.outfitArray[i]);
    }
  }
  let c_post = arr[pidx];
  if (c_post == undefined) {
    c_post = {
      id: "id",
      userName: global.displayName,
      userImg: "profilePic",
      postTime: "edited " + new Date().toDateString(),
      post: "postText",
      postImg: "postImg",
      saves: "saves",
    };
  }
  let c_outfit = iter[index];

  function nextPost() {
    if (pidx < arr.length - 1) {
      setPidx(pidx + 1);
      setPostText(arr[pidx + 1].post);
    }
  }

  function prevPost() {
    if (pidx > 0) {
      setPidx(pidx - 1);
      setPostText(arr[pidx - 1].post);
    }
  }
  if (c_outfit != null) {
    return (
      <View style={styles.container}>
        <Button
              icon="compare-horizontal"
              mode="contained"
              style={styles.sortButton}
              onPress={() => {
                showModalSort();
                sortByTag();
              }}
            >Sort By...</Button>
        <Post>
          <ContentFilter>
            <Text style={styles.text}>{filter}</Text>
            <Switch
              style={styles.switchButton}
              trackColor={{ false: "#2BFF00", true: "2BFF00" }}
              thumbColor={isEnabled ? "#2BFF00" : "#FD6868"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </ContentFilter>
          <FlatList
            data={posts}
            renderItem={({ item }) => <UploadPost item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          <StatusBar style="auto" />
        </Post>
        <View style={{ flexDirection: "row" }}>
          <Button
            style={styles.postButton}
            onPress={() => {
              setAddingPostMenu(true);
            }}
          >
            Post
          </Button>
          <Button
            style={styles.postButton}
            visible={hasPost}
            onPress={() => {
              setPostText(c_post.post);
              setEditingPostMenu(true);
            }}
          >
            Edit Posts
          </Button>
        </View>

        <Portal>
          <Modal
            visible={sortMenu}
            style={styles.modalMenu}
            dismissable={false}
          >
            <Text variant="headlineSmall" style={styles.outfitText}>
              Sort Posts
            </Text>
            <View style={styles.buttonSpacing}></View>
            <TextInput
              label="Tag Name"
              value={sortingTag}
              onChangeText={(sortingTag) => setSortingTag(sortingTag)}
            />
            <View style={styles.buttonSpacing}></View>
            <Button
              icon="check-bold"
              mode="contained"
              style={styles.modalButton}
              onPress={() => {
                setSortMenu(false); 
                sortByTag();
              }}
            >
              Sort By Tag
            </Button>
            <Button
              icon="check-bold"
              mode="contained"
              style={styles.modalButton}
              onPress={() => {
                setSortMenu(false); 
                sortBySaves();
              }}
            >
              Sort By # Saves
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button
              icon="close-thick"
              mode="contained"
              style={styles.modalButton}
              onPress={() => {
                setSortMenu(false); 
              }}
            >
              Cancel
            </Button>
          </Modal>
        </Portal>

        <Portal>
          <Modal
            visible={addingPostMenu}
            style={styles.modalMenu}
            dismissable={false}
          >
            <Text variant="headlineSmall" style={styles.outfitText}>
              Outfit:
            </Text>
            <Text variant="bodyLarge" style={styles.outfitText}>
              {c_outfit.name}
            </Text>
            <View style={styles.buttonSpacing}></View>
            <Image
              style={styles.closetPicture}
              source={{ uri: "data:image/png;base64," + c_outfit.image }}
            />
            <View style={styles.buttonRowContainer}>
              <Button
                icon="arrow-left-bold"
                mode="contained-tonal"
                style={styles.navButtons}
                onPress={prevOutfit}
              >
                Previous
              </Button>
              <View style={styles.buttonSpacing}></View>
              <Button
                icon="arrow-right-bold"
                mode="contained-tonal"
                style={styles.navButtons}
                onPress={nextOutfit}
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Next
              </Button>
            </View>

            <TextInput
              multiline={true}
              blurOnSubmit={true}
              label="Post Text"
              value={PostText}
              placeholder="These are winter boots..."
              onChangeText={(PostText) => setPostText(PostText)}
            />
            <View style={{ flexDirection: "row" }}>
              <Button
                style={styles.postButton}
                onPress={() => {
                  setAddingPostMenu(false);
                  addPost(
                    numPosts + 1,
                    global.pfp64,
                    PostText,
                    c_outfit.image,
                    0,
                    c_outfit.tags
                  );
                  setPostText("");
                }}
              >
                Post
              </Button>
              <Button
                style={styles.postButton}
                onPress={() => {
                  setAddingPostMenu(false);
                  setPostText("");
                }}
              >
                Cancel
              </Button>
            </View>
            <View style={styles.modalMargin} />
          </Modal>
        </Portal>

        <Portal>
          <Modal
            visible={editingPostMenu}
            style={styles.modalMenu}
            dismissable={false}
          >
            <Text variant="headlineSmall" style={styles.outfitText}>
              Select A Post:
            </Text>
            <View style={styles.buttonSpacing}></View>
            <Image
              style={styles.closetPicture}
              source={{ uri: "data:image/png;base64," + c_post.postImg }}
            />
            <View style={styles.buttonRowContainer}>
              <Button
                icon="arrow-left-bold"
                mode="contained-tonal"
                style={styles.navButtons}
                onPress={prevPost}
              >
                Previous
              </Button>
              <View style={styles.buttonSpacing}></View>
              <Button
                icon="arrow-right-bold"
                mode="contained-tonal"
                style={styles.navButtons}
                onPress={nextPost}
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Next
              </Button>
            </View>
            <Text variant="bodyLarge">Post Text: {PostText}</Text>
            <View style={styles.buttonSpacing}></View>
            <View style={{ flexDirection: "row" }}>
              <Button
                style={styles.postButton}
                onPress={() => {
                  setEditingPostMenu(false);
                  setSpecificPostMenu(true);
                  setPostText(c_post.post);
                }}
              >
                Select
              </Button>
              <Button
                style={styles.postButton}
                onPress={() => {
                  setEditingPostMenu(false);
                  setPostText("");
                }}
              >
                Cancel
              </Button>
            </View>
            <View style={styles.modalMargin} />
          </Modal>
        </Portal>

        <Portal>
          <Modal
            visible={specificPostMenu}
            style={styles.modalMenu}
            dismissable={false}
          >
            <Text variant="headlineSmall" style={styles.outfitText}>
              Edit Post:
            </Text>
            <Text variant="bodyLarge" style={styles.outfitText}>
              {c_outfit.name}
            </Text>
            <View style={styles.buttonSpacing}></View>
            <Image
              style={styles.closetPicture}
              source={{ uri: "data:image/png;base64," + c_outfit.image }}
            />
            <View style={styles.buttonRowContainer}>
              <Button
                icon="arrow-left-bold"
                mode="contained-tonal"
                style={styles.navButtons}
                onPress={prevOutfit}
              >
                Previous
              </Button>
              <View style={styles.buttonSpacing}></View>
              <Button
                icon="arrow-right-bold"
                mode="contained-tonal"
                style={styles.navButtons}
                onPress={nextOutfit}
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Next
              </Button>
            </View>

            <TextInput
              multiline={true}
              blurOnSubmit={true}
              label="Post Text"
              value={PostText}
              placeholder="These are winter boots..."
              onChangeText={(PostText) => setPostText(PostText)}
            />
            <View style={{ flexDirection: "row" }}>
              <Button
                style={styles.postButton}
                onPress={() => {
                  setSpecificPostMenu(false);
                  editPost(
                    c_post.postImg,
                    c_post.post,
                    global.pfp64,
                    PostText,
                    c_outfit.image,
                    c_post.saves
                  );
                  setPostText("");
                }}
              >
                Save
              </Button>
              <Button
                style={styles.postButton}
                onPress={() => {
                  setSpecificPostMenu(false);
                  setPostText("");
                }}
              >
                Cancel
              </Button>
            </View>
            <Button
              style={styles.postButton}
              onPress={() => {
                setSpecificPostMenu(false);
                deletePost(c_post.id);
                setPostText("");
              }}
            >
              {" "}
              Delete Post
            </Button>
            <View style={styles.modalMargin} />
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
            <Switch
              style={styles.switchButton}
              trackColor={{ false: "#2BFF00", true: "2BFF00" }}
              thumbColor={isEnabled ? "#2BFF00" : "#FD6868"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </ContentFilter>
          <FlatList
            data={posts}
            renderItem={({ item }) => <UploadPost item={item} />}
            keyExtractor={(item) => item.id}
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
    backgroundColor: "#f5fafc",
    alignItems: "center",
    paddingTop: 0,
  },
  modalMenu: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  modalButton: {
    width: 190,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center",
  },
  sortButton: {
    width: 150,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center",
    alignSelf: "flex-end",
    margin: 10
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
    alignSelf: "center",
  },
  postButton: {
    borderWidth: 1,
    marginTop: 0,
    borderColor: "black",
    margin: 10
  },
  scrollView: {
    //backgroundColor: 'orange',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 30,
    marginLeft: 30,
    marginTop: 5,
  },
  modalMargin: {
    paddingBottom: 200,
  },
  switchButton: {
    marginLeft: 100,
    marginBottom: 15,
    marginTop: 10,
  },
});

export default InspirationScreen;
