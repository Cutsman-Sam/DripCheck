import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Text, Button, Paragraph } from 'react-native-paper';
import UploadImage from '../utilities/UploadImage';

function ProfileScreen({navigation}) {
    return (
    <View style={styles.container}>
      <View style={styles.containerSettings}>
        <Button icon="cog" mode="outlined" onPress={() => {navigation.navigate("Settings")}} style={styles.settingsButton}>
          Settings
        </Button>
      </View>
     <UploadImage/>
      <Text variant="headlineSmall" style={styles.username} > {global.userEmail} </Text>
      <Paragraph style={styles.bio}>This is a profile bio. I enjoy counting robotic sheep, and having a long enough bio to test text wrapping!</Paragraph>
      <Button icon="account-wrench" mode="outlined" style={styles.editButton}>
        Edit Profile
      </Button>
      <View style={styles.containerRow}>
        <Text variant="headlineLarge" style={styles.numberField}>0</Text>
        <Text variant="headlineLarge" style={styles.numberField}>0</Text>
      </View>
      <View style={styles.containerRow}>
        <Text variant="headlineSmall" style={styles.numberLabel}>Followers</Text>
        <Text variant="headlineSmall" style={styles.numberLabel}>Following</Text>
      </View>
      <Button mode="outlined" style={styles.editButton}>
        Manage Posts
      </Button>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      flex: 1,
      backgroundColor: '#f5fafc',
      alignItems: 'center',
    },
    containerSettings: {
      paddingTop: 0,
      paddingRight: 10,
      backgroundColor: '#f5fafc',
      flexDirection: "row",
      alignSelf: 'flex-end',
    },
    containerRow: {
      paddingTop: 0,
      flexDirection: "row",
      backgroundColor: '#f5fafc',
      alignItems: 'center',
    },

    settingsButton: {
      width: 120,
    },
    profileAvatar: {
      width: 150,
      height: 150,
      borderRadius: 150/2,
      backgroundColor: "E1E2E6",
      justifyContent: 'center',
      alignItems: 'center'      
    },
    username: {
      paddingTop: 15,
      paddingBottom:5,
    },
    bio: {
      paddingTop: 5,
      paddingHorizontal: 25,
      paddingBottom: 20,
    },
    editButton: {
      width: 180,
    },
    numberField: {
      paddingTop: 25,
      flex: 1,
      textAlign: 'center'
    },
    numberLabel: {
      paddingTop: 15,
      flex: 1,
      textAlign: 'center',
      paddingBottom: 20,
    },
});

export default ProfileScreen;

