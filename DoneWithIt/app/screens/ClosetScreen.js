import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Portal, Modal, TextInput } from 'react-native-paper';
import UploadOutfit from '../utilities/UploadOutfit';
import {addNewOutfit} from '../utilities/requestData';
global.currentImage;

function ClosetScreen(props) {
  // Menu properties (what menus are open, fields being changed in text prompts, etc.)
  const [addingOutfitMenu, setAddingOutfitMenu] = React.useState(false);
  const [editOutfitMenu, setEditOutfitMenu] = React.useState(false);
  const [addTagMenu, setAddTagMenu] = React.useState(false);
  const [addingName, setAddingName] = React.useState("");
  const [addingTag, setAddingTag] = React.useState("");

  // Closet properties, the number of outfits and outfit array respectively.
  // I can probably nix the number of outfits hook state variable with the array length, 
  // might look at later?
  const [outfitArray, setOutfitArray] = React.useState([]);
  const [numOutfits, setNumOutfits] = React.useState(0);

  // Current outfit being viewed in the closet
  const [index, setIndex] = React.useState(0);

  var outfitname = "";
  if (numOutfits > 0) {
    outfitname = outfitArray[index].image;
  }


  //---------------
  // Menu Functions
  //---------------
  // Shifts the outfit index over by one to the right, bounded
  function nextOutfit() {
    if (index < numOutfits - 1) {
      setIndex(index + 1);
    }
  }

  // Shifts the outfit index over by one to the left, bounded
  function prevOutfit() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  
  // Shows the modal for adding an outfit.
  function showModal() {
    setAddingOutfitMenu(true);
    setAddingName("");
  }

  function showModalEdit() {
    setEditOutfitMenu(true);
    setAddingName(outfitArray[index].name);
  }

  function showModalTag() {
    setAddTagMenu(true);
    setAddingTag("");
  }

  // Hides all modal menus.
  function hideModalAll() {
    setAddingOutfitMenu(false);
    setEditOutfitMenu(false);
    setAddTagMenu(false);
  }

  //----------------------------
  // Outfit Management Functions
  //----------------------------
  // Adds an outfit into the closet.
  function addOutfit(o_name, o_image) {
    if (o_name != "" && o_image != "") {
      let outfit = {
        name: o_name,
        date: "N/A",
        image: o_image,
        tags: ""
      };
      setOutfitArray(outfitArray.concat(outfit));
      let newOutfits = numOutfits + 1;
      let newIndex = numOutfits;
      setNumOutfits(newOutfits);
      setIndex(newIndex);
      addNewOutfit(global.userEmail, o_name, "N/A", o_image);
    }
  }

  // Deletes an outfit from the closet.
  function deleteOutfit() {
    let tempArray = outfitArray;
    tempArray.splice(index, 1);
    setOutfitArray(tempArray);

    let newOutfits = numOutfits - 1;
    let newIndex = index - 1;
    if (newIndex < 0) { newIndex = 0; }
    setNumOutfits(newOutfits);
    setIndex(newIndex);
  }

  // Changes the outfit at the current index to the new values provided.
  function changeOutfit(o_name, o_image) {
    if (o_name != "" && o_image != "") {
      let outfit = {
        name: o_name,
        date: "N/A",
        image: o_image,
        tags: ""
      };
      let tempArray = outfitArray;
      tempArray.splice(index, 1, outfit);
      setOutfitArray(tempArray);
    }
  }

  // Adds a tag to an outfit's tag list if it is not present.
  function addTag(tag) {
    if (tag != "") {
      let valid = true;
      if (outfitArray[index].tags != "") {
        let str = outfitArray[index].tags.toString();
        const strArray = str.split(", ");
        var arrayLength = strArray.length;
        
        for (var i = 0; i < arrayLength; i++) {
            if (strArray[i].toUpperCase() === tag.toUpperCase()) {
              valid = false;
            }
        }
        if (valid) {
          let tempArray = outfitArray;
          let replaceOutfit = outfitArray[index];
          replaceOutfit.tags += ", " + tag;
          tempArray.splice(index, 1, replaceOutfit);
          setOutfitArray(tempArray);
        }
      } else {
        let tempArray = outfitArray;
        let replaceOutfit = outfitArray[index];
        replaceOutfit.tags = tag;
        tempArray.splice(index, 1, replaceOutfit);
        setOutfitArray(tempArray);
      }
    }
  }

  // Removes a tag from an outfit's tag list if it is present.
  function removeTag(tag) {
    if (tag != "") {
      let str = outfitArray[index].tags;
      const strArray = str.split(", ");
      
      var arrayLength = strArray.length;
      let dupeArray = strArray;
      for (var i = 0; i < arrayLength; i++) {
        let upperTag = strArray[i].toUpperCase();
        console.log(i);
        console.log(upperTag);
        if (upperTag === tag.toUpperCase()) {
          dupeArray.splice(i, 1);
        }
      }
      let tempArray = outfitArray;
      let replaceOutfit = outfitArray[index];
      replaceOutfit.tags = dupeArray.toString();
      tempArray.splice(index, 1, replaceOutfit);
    }
  }

  

  if (numOutfits > 0) {
    return (
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.outfitText}>{outfitArray[index].name}</Text>
        <Text variant="headerLarge" style={styles.dateText}>Last Worn: {outfitArray[index].date}</Text>
        <Text variant="headerLarge" style={styles.dateText}>Tags: {outfitArray[index].tags}</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.closetPicture}
            source={{ uri: "data:image/png;base64,"+outfitname }}
          />
        </View>
        <View style={styles.buttonRowContainer}>
          <Button icon="arrow-left-bold" mode="contained-tonal" style={styles.navButtons} onPress={prevOutfit}>
            Previous
          </Button>
          <View style={styles.buttonSpacing}></View>
          <Button icon="arrow-right-bold" mode="contained-tonal" style={styles.navButtons} onPress={nextOutfit} contentStyle={{flexDirection: 'row-reverse'}}>
            Next
          </Button>
        </View>
        <Button icon="account-cowboy-hat" mode="contained" style={styles.addOutfit} onPress={showModal}>
          Add Outfit
        </Button>
        <View style={{padding: 5}}></View>
        <View style={styles.buttonRowContainer}>
          <Button icon="pencil" mode="contained" style={styles.addOutfit} onPress={showModalEdit}>
            Edit Outfit
          </Button>
          <View style={{padding: 5}}></View>
          <Button icon="pencil" mode="contained" style={styles.addOutfit} onPress={showModalTag}>
            Add Tag
          </Button>
        </View>
        



        <Portal>
          <Modal visible={editOutfitMenu} style={styles.modalMenu} dismissable={false}>
            <Text variant="headlineSmall" style={styles.outfitText}>Edit Outfit</Text>
            <View style={styles.buttonSpacing}></View>
            <TextInput label="Outfit Name" value={addingName} onChangeText={addingName => setAddingName(addingName)}/>
            <UploadOutfit/>

            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); changeOutfit(addingName, global.outfitBase64)}}>
              Confirm Changes
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
              Cancel Changes
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="trash-can" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); deleteOutfit()}}>
              Delete Outfit
            </Button>
          </Modal>
        </Portal>



        <Portal>
          <Modal visible={addingOutfitMenu} style={styles.modalMenu} dismissable={false}>
            <Text variant="headlineSmall" style={styles.outfitText}>Outfit Details</Text>
            <View style={styles.buttonSpacing}></View>
            <TextInput label="Outfit Name" value={addingName} onChangeText={addingName => setAddingName(addingName)}/>
            <UploadOutfit style={{alignSelf: "center"}}/>

            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); addOutfit(addingName, global.outfitBase64)}}>
              Confirm Outfit
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
              Cancel
            </Button>
          </Modal>
        </Portal>



        <Portal>
          <Modal visible={addTagMenu} style={styles.modalMenu} dismissable={false}>
            <Text variant="headlineSmall" style={styles.outfitText}>Tag Details</Text>
            <Text variant="headerLarge" style={styles.dateText}>Tags: {outfitArray[index].tags}</Text>
            <View style={styles.buttonSpacing}></View>
            <TextInput
              label="Tag Name"
              value={addingTag}
              onChangeText={addingTag => setAddingTag(addingTag)}
            />
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); addTag(addingTag)}}>
              Confirm Tag Addition
            </Button>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); removeTag(addingTag)}}>
              Confirm Tag Removal
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
              Cancel
            </Button>
          </Modal>
        </Portal>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.noOutfitText}>No Outfits Yet...</Text>
        <Button icon="account-cowboy-hat" mode="contained" style={styles.addOutfit} onPress={showModal}>
          Add Outfit
        </Button>
        <Portal>
          <Modal visible={addingOutfitMenu} style={styles.modalMenu} dismissable={false}>
            <Text variant="headlineSmall" style={styles.outfitText}>Outfit Details</Text>
            <View style={styles.buttonSpacing}></View>
            <TextInput label="Outfit Name" value={addingName} onChangeText={addingName => setAddingName(addingName)}/>
            <UploadOutfit/>
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); addOutfit(addingName, global.outfitBase64)}}>
              Confirm Outfit
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
              Cancel
            </Button>
          </Modal>
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fafc',
    alignItems: 'center',
  },
  imageContainer: {
    paddingBottom: 10,
  },
  buttonRowContainer: {
    paddingBottom: 10,
    flexDirection: "row",
  },
  buttonSpacing: {
    padding: 10,
  },
  modalMenu: {
    backgroundColor: '#ffffff',
    padding: 20
  },

  navButtons: {
    width: 120,
    borderWidth: 1,
    borderColor: "black",
  },
  noOutfitText: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  outfitText: {
    alignSelf: "center",
    paddingTop: 10,
  },
  dateText: {
    paddingBottom: 10,
  },
  closetPicture: {
    height: 340,
    width: 280,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black"
  },
  addOutfit: {
    borderWidth: 1,
    marginTop: 0,
    borderColor: "black"
  },
  modalButton: {
    width: 190,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center"
  },
  inputField: {
    paddingTop: 20,
  },
});

export default ClosetScreen;

