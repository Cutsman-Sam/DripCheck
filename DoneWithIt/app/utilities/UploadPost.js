import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, ScrollView, FlatList, Image, Text} from "react-native";
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
  Follow,
} from "../styles/postStyle";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";


const uploadPost = ({ item }) => {
  saveIcon = item.saved ? "heart" : "heart-outline";
  saveIconColor = item.saved ? "#2e64e5" : "#333";


  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);


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
        <Button onPress={() => {console.log("Following")}} >Follow</Button>
      </UserInfo>
      <PostText> {item.post} </PostText>
      <PostImg source={{ uri: "data:image/png;base64," + item.postImg }} />

      <InteractionWrapper>
        <Interaction active={item.saved}>
          <Ionicons name={saveIcon} size={25} color={saveIconColor} />
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
