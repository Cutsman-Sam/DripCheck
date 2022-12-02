import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Paragraph, IconButton } from "react-native-paper";
import UploadImage from "../utilities/UploadImage";

function ProfileScreen({ navigation }) {
  const [reload, setReload] = React.useState(0);
  const [oCount, setOCount] = React.useState(0);
  const [calendarStreak, setCalendarStreak] = React.useState(0);
  following = 0;

  if(global.followingUsernames != "") {
    const follower_array = global.followingUsernames.split(',');
    following = follower_array.length;
  }
  if (global.profileLoaded == null) {
    global.profileLoaded = true;
    setStats();
  }
  function setStats() {
    setOCount(global.oCount);
    setCalendarStreak(global.calendarStreak);
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerSettings}>
        <Button
          icon="cog"
          mode="outlined"
          onPress={() => {
            navigation.navigate("Settings");
          }}
          style={styles.settingsButton}
        >
          Settings
        </Button>
      </View>
      <UploadImage />
      <Text variant="headlineSmall" style={styles.username}>
        {" "}
        {global.displayName}{" "}
      </Text>
      <Paragraph style={styles.bio}>
        This is a profile bio. I enjoy counting robotic sheep, and having a long
        enough bio to test text wrapping!
      </Paragraph>

      <View style={styles.containerRow}>
        <Text variant="headlineLarge" style={styles.numberField}>
          {calendarStreak}
        </Text>
        <Text variant="headlineLarge" style={styles.numberField}>
          {oCount}
        </Text>
        <Text variant="headlineLarge" style={styles.numberField}>
          {following}
        </Text>
      </View>
      <View style={styles.containerRow}>
      <Text variant="headlineSmall" style={styles.numberLabel}>
          Streak 🔥
        </Text>
        <Text variant="headlineSmall" style={styles.numberLabel}>
          # of Outfits
        </Text>
        <Text variant="headlineSmall" style={styles.numberLabel}>
          Following
        </Text>
      </View>
      <Text>Account Created: {global.accountDate}</Text>
      <IconButton
        icon="refresh"
        size={50}
        onPress={() => {
          setStats();
        }}
      ></IconButton>
    </View>
  );
}

//<Button icon="account-wrench" mode="outlined" style={styles.editButton}>
//Edit Profile
//</Button>

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#f5fafc",
    alignItems: "center",
  },
  containerSettings: {
    paddingTop: 0,
    paddingRight: 10,
    backgroundColor: "#f5fafc",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  containerRow: {
    paddingTop: 0,
    flexDirection: "row",
    backgroundColor: "#f5fafc",
    alignItems: "center",
  },

  settingsButton: {
    width: 120,
  },
  profileAvatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "E1E2E6",
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    paddingTop: 15,
    paddingBottom: 5,
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
    textAlign: "center",
  },
  numberLabel: {
    paddingTop: 15,
    flex: 1,
    textAlign: "center",
    paddingBottom: 20,
  },
});

export default ProfileScreen;
