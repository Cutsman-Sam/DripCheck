import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Text, Button, Paragraph, DefaultTheme, Portal, Dialog, Switch } from 'react-native-paper';

const redTheme = {
  ...DefaultTheme,
  roundness: 4,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    outline: '#820704',
  }
};


function SettingsScreen({navigation}) {
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const [likeNotifsEnabled, toggleLikeNotifs] = React.useState(false);
  const onToggleLikeNotifs = () => toggleLikeNotifs(!likeNotifsEnabled);

  const [reminderNotifsEnabled, toggleReminderNotifs] = React.useState(false);
  const onToggleReminderNotifs = () => toggleReminderNotifs(!reminderNotifsEnabled);

  return (
  <View style={styles.container}>
    <Text variant="headlineSmall" style={styles.header}>Notification Settings</Text>
    <View style={styles.containerCard}>
      <View style={styles.containerRow}>
        <Text variant="titleMedium" style={styles.notifOption}>Notify when Post Liked</Text>
        <View style={styles.containerSwitch}>
          <Switch value={likeNotifsEnabled} onValueChange={onToggleLikeNotifs} style={styles.switch}/>
        </View>
      </View>
      <View style={styles.containerRow}>
        <Text variant="titleMedium" style={styles.notifOption}>Outfit Reminders</Text>
        <Switch value={reminderNotifsEnabled} onValueChange={onToggleReminderNotifs} style={styles.switch}/>
      </View>
    </View>

    <View style={styles.divider}></View>
    <Text variant="headlineSmall" style={styles.header}>Account Settings</Text>
    <Button icon="account-arrow-left" mode="outlined" style={styles.editButton} onPress={() => {navigation.navigate("Login")}}>
      Log Out
    </Button>
    <View style={styles.emptyView}></View>
    <Button icon="alert-decagram" mode="outlined" style={styles.editButton} theme={redTheme} buttonColor="#e8231e" textColor="#4d0200" onPress={() => {setVisible(true);}}>
      Delete Account
    </Button>
    <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={true}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete your Dripcheck account? This cannot be undone.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {setVisible(false); navigation.navigate("Login")}}>Delete</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: '#f5fafc',
    alignItems: 'flex-start',
  },
  containerCard: {
    backgroundColor: '#FF0000',
  },
  containerRow: {
    paddingTop: 0,
    flexDirection: "row",
    backgroundColor: '#f5fafc',
    alignItems: 'center',
  },
  containerSwitch: {
    justifyContent: 'flex-end',
  },
  divider: {
    width: 320,
    paddingTop: 50,
    paddingLeft: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  emptyView: {
    paddingTop: 20,
  },

  header: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  notifOption: {
    paddingTop: 0,
  },
  switch: {
    alignSelf: 'flex-end',
  },
});

export default SettingsScreen;

