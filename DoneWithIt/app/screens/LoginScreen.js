import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import * as Google from "expo-auth-session/providers/google";
import {
  insertNewUser,
  userExists,
  getCurrentDate,
  getAllOutfits,
  getDaysUser,
  getAllPosts,
  getUserPosts,
} from "../utilities/requestData";
import { testDatabaseFunctions } from "../utilities/testDatabaseFunctions";

function LoginScreen({ navigation }) {
  //const [open, setOpen] = useState(false)

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const [request, resp, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "680747377509-nhf0jt64eghn93bcmanicj7a2aqok75q.apps.googleusercontent.com",
    scopes: [
      "profile",
      "email",
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
  React.useEffect(() => {
    if (resp?.type === "success") {
      setVisible(true);
      const token = resp.authentication.accessToken;
      async function fetchData() {
        let response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        let data = await response.json();
        global.userEmail = data.email;
        global.displayName = String(global.userEmail).substring(
          0,
          String(global.userEmail).indexOf("@")
        );
      }
      fetchData();
    }
  }, [resp]);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <Button
        icon="account-key"
        mode="contained"
        onPress={() => {
          promptAsync();
        }}
      >
        Sign in with Google
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Dripcheck collects certain data about the user, such as uploaded
              photos, email addresses, and liked posts. Do you consent to this
              collection of data?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={async () => {
                setVisible(false);
                navigation.navigate("Loading");
                await handleLogin();
                navigation.navigate("BottomTabs");
              }}
            >
              Accept
            </Button>
            <Button onPress={hideDialog}>Decline</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
//<Button onPress={showDialog}>Show Dialog</Button>

async function handleLogin() {
  //get all inspiration posts
  global.postArray = new Array();
  let posts = await getAllPosts();

  for (var i in posts) {
    if (posts[i] != null) {
      global.postArray.push(posts[i]);
    }
  }
  global.myPostsArray = new Array();
  let myPosts = await getUserPosts(global.displayName);
  for (var i in myPosts) {
    if (myPosts[i] != null) {
      global.myPostsArray.push(myPosts[i]);
    }
  }
  console.log("Posts loaded");
  global.oCount = 0;
  global.allAddedTags = [];
  let previousData = await userExists(global.userEmail);
  if (previousData == false) {
    global.accountDate = getCurrentDate();
    global.outfitArray = new Array();
    global.dayArray = new Array();
    global.oCount = 0;
    global.calendarStreak = 0;
    insertNewUser(global.userEmail, global.displayName, 0, 0);
  } else {
    //Utilize previousData to load user's stuff
    global.accountDate = JSON.parse(JSON.stringify(previousData)).dateCreated;
    global.pfp64 = JSON.parse(JSON.stringify(previousData)).profilePic;
    let outfits = await getAllOutfits(global.userEmail);
    var obj = JSON.parse(JSON.stringify(outfits));
    var res = [];
    for (var i in obj) {
      if (obj[i] != null) {
        res.push(obj[i]);
      }
    }
    if (res.length != 0)  {
      global.oCount = res.length;
      let arr = new Array(res.length);
      for (var i = 0; i < res.length; i++)  {
        let created = res[i].dateCreated;
        let tags = res[i].tags;
        let imageString = res[i].imageString;
        let outfitName = res[i].outfitName;
        let description = res[i].description;
        let lastWorn = res[i].lastWorn;
        let id = res[i]._id;
        let outfit = {
          id: id,
          description: description,
          name: outfitName,
          date: created,
          image: imageString,
          tags: tags,
          lastWorn: lastWorn,
        };
        arr.push(outfit);
      }
        global.outfitArray = arr;
        console.log("Added old outfits");

        global.tagFrequencyList = new Array();
        //initialize tagFrequencyList
        for(let i = 0; i < global.outfitArray.length; i++) {
          if(global.outfitArray[i] != null && global.outfitArray[i].tags != undefined) {
            if(global.outfitArray[i].tags != "" && global.outfitArray[i].tags != undefined) {

              //console.log(global.outfitArray[i].tags);
              let tagArr = global.outfitArray[i].tags.split(',');
              for(let j = 0; j < tagArr.length; j++) {
                tagArr[j] = tagArr[j].trim();
                let exists = tagExists(tagArr[j]);

                if(exists != false) {
                  global.tagFrequencyList[exists - 1].frequency += 1;
                } else {
                  console.log("Adding new Tag: " + tagArr[j]);
                  let tagObject = {
                    tag: tagArr[j],
                    frequency: 1
                  }
                  global.tagFrequencyList.push(tagObject);    
                }       
              }
            }
          }
        }
  
        //sort by frequency
        global.tagFrequencyList.sort(function(a, b) {
          return parseInt(b.frequency) - parseInt(a.frequency);
        });
        console.log(global.tagFrequencyList);
        console.log("Added tags to list and initialized tag frequency. Sorted descending")
        //console.log(global.tagFrequencyList);
    } else {
        global.tagFrequencyList = new Array();
      global.outfitArray = new Array();
    }

    let d = await getDaysUser(global.userEmail);
    var items = JSON.parse(JSON.stringify(d));
    var days = [];
    for (var i in items) {
      if (items[i] != null) {
        days.push(items[i]);
      }
    }
    if (days.length != 0) {
      let temp = new Array(days.length);
      for (var i = 0; i < days.length; i++)  {
        let email = global.userEmail;
        let text = days[i].text;
        let date = days[i].date;
        let outfitId = days[i].outfitID;
        let id = days[i]._id;
        let day = {
          id: id,
          outfitId: outfitId,
          text: text,
          email: email,
          date: date,
        };
        temp.push(day);
      }
      let today = new Date().toDateString();
      global.calendarStreak = 0;
      let curr = new Date(today).getTime();
      let streaking = true;
      while (streaking) {
        let streak = global.calendarStreak;
        for (var i = 0; i < temp.length; i++)  {
          if (temp[i] != null)  {
            if (
              curr - new Date(temp[i].date.dateString).getTime() <=
                1000 * 3600 * 30 &&
              curr - new Date(temp[i].date.dateString).getTime() > 0
            ) {
              global.calendarStreak++;
              curr = new Date(temp[i].date.dateString).getTime();
            }
          }
        }
        if (global.calendarStreak == streak) {
          streaking = false;
        }
      }
      global.dayArray = temp;
      console.log("Added calendar data");
    } else {
      global.dayArray = new Array();
    }
  }
  global.ready = 1;
  console.log("ready");
  //testDatabaseFunctions();
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#daecf5",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    //justifyContent: 'flex-end',
    marginTop: 200
    },
    image: {
      marginBottom: 60,
    }
});

export default LoginScreen;
