import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Paragraph } from 'react-native-paper';

function ClosetScreen(props) {
    return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.outfitText}>Casual Blue Flannel</Text>
      <Text variant="headerLarge" style={styles.dateText}>Last Worn: 10/13/22</Text>
      <View style={styles.imageContainer}>
      <Image
        style={styles.closetPicture}
        source={require('./../closetimages/sample1.jpg')}
      />
      </View>
      <View style={styles.buttonRowContainer}>
        <Button mode="contained" style={styles.navButtons}>
        Previous
        </Button>
        <View style={styles.buttonSpacing}></View>
        <Button mode="contained" style={styles.navButtons}>
        Next
        </Button>
      </View>
      <Button icon="account-cowboy-hat" mode="contained" style={styles.addOutfit}>
      Add Outfit
      </Button>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5fafc',
      alignItems: 'center',
    },
    imageContainer: {
      paddingBottom: 20,
    },
    buttonRowContainer: {
      paddingBottom: 20,
      flexDirection: "row",
    },
    buttonSpacing: {
      paddingHorizontal: 10,
    },

    navButtons: {
      width: 120,
      borderWidth: 1,
      borderColor: "black"
    },

    outfitText: {
      paddingTop: 10,
    },
    dateText: {
      paddingBottom: 10,
    },
    closetPicture: {
      height: 400,
      width: 280,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "black"
    },
    addOutfit: {
      borderWidth: 1,
      borderColor: "black"
    },
});

export default ClosetScreen;

