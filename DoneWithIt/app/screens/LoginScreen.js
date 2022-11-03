import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google';
import {insertNewUser, userExists, getCurrentDate} from '../utilities/requestData'
global.userEmail;
global.remindersEnabled;
global.likesEnabled;
global.displayName;
global.accountDate;

function LoginScreen({navigation}) {
  //const [open, setOpen] = useState(false)

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const [request, resp, promptAsync] = Google.useAuthRequest({
    expoClientId: '680747377509-nhf0jt64eghn93bcmanicj7a2aqok75q.apps.googleusercontent.com',
    scopes: [
      'profile',
      'email',
      'openid',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]
  });
  React.useEffect(() => {
    if (resp?.type === 'success') {
      setVisible(true);
      const token = resp.authentication.accessToken;
      async function fetchData() {
        
        let response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          method: 'GET',
          headers: {
          Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        })
        let data = await response.json();
        global.userEmail = data.email;
        global.displayName = (String) (global.userEmail).substring(0, (String) (global.userEmail).indexOf("@"));

        //console.log("LoginScreen: called userExists");
        let previousData = await userExists(global.userEmail)
        
        //if user exists do nothing, else add them to database.
        if(previousData == false) {
          //console.log("LoginScreen: called insertNewUser");
          global.accountDate = getCurrentDate();
          insertNewUser(global.userEmail, global.displayName);
        } else {
          //Utilize previousData to load user's stuff
          global.accountDate = JSON.parse(JSON.stringify(previousData)).document.dateCreated

        }
        //TODO: utilize this email address
        //requestDatabase(2,data.email,data.email,"10-19-2020");
      }
      fetchData()
     
    }
  }, [resp]);
    return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <Button icon="account-key" mode="contained" onPress={() => {promptAsync();}}>
        Sign in with Google
      </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Dripcheck collects certain data about the user, such as uploaded photos, email addresses, and liked posts. Do you consent to this collection of data?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {setVisible(false); navigation.navigate("BottomTabs")}}>Accept</Button>
              <Button onPress={hideDialog}>Decline</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
    );
}
//<Button onPress={showDialog}>Show Dialog</Button>

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#daecf5',
      alignItems: 'center',
      justifyContent: 'center',
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

