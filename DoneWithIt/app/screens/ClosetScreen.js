import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Portal, Modal, TextInput } from 'react-native-paper';
import UploadOutfit from '../utilities/UploadOutfit';
import {addNewOutfit, updateOutfit, deleteOutfitDB} from '../utilities/requestData';
import DropDown from "react-native-paper-dropdown";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-detect";

global.currentImage;

function ClosetScreen(props) {

  
  // Menu properties (what menus are open, fields being changed in text prompts, etc.)
  const [addingOutfitMenu, setAddingOutfitMenu] = React.useState(false);
  const [editOutfitMenu, setEditOutfitMenu] = React.useState(false);
  const [addTagMenu, setAddTagMenu] = React.useState(false);
  const [sortMenu, setSortMenu] = React.useState(false);

  const [addingName, setAddingName] = React.useState("");
  const [addingTag, setAddingTag] = React.useState("");

  // Closet properties, the number of outfits and outfit array respectively.
  // I can probably nix the number of outfits hook state variable with the array length, 
  // might look at later?
  const [outfitArray, setOutfitArray] = React.useState([]);
  const [numOutfits, setNumOutfits] = React.useState(0);

  // Current outfit being viewed in the closet
  const [index, setIndex] = React.useState(0);

  const [showDropDown, setShowDropDown] = React.useState(false);
  
  let tagList = [];
  console.log(global.allAddedTags);
  for (let i = 0; i < global.allAddedTags.length; i++) {
    let obj = {label: global.allAddedTags[i], value: global.allAddedTags[i] }
    tagList.push(obj);
  }
  


  var outfitname = "";
  if (numOutfits > 0) {
    outfitname = outfitArray[index].image;
  }
  if(global.outfitArray.length != 0 && global.closetLoaded == null){
    var arr = new Array();
    for(var i = 0; i < global.outfitArray.length; i++){
      if(global.outfitArray[i] != null){
        let outfit = {
          name: global.outfitArray[i].name,
          date: global.outfitArray[i].date,
          image: global.outfitArray[i].image,
          tags: global.outfitArray[i].tags,
          lastWorn: global.outfitArray[i].lastWorn
        };
        arr.push(outfit);
        setOutfitArray(arr);
        let newOutfits = numOutfits + arr.length;
        let newIndex = numOutfits;
        setNumOutfits(newOutfits);
        setIndex(0);
        //addOldOutfit(global.outfitArray[i].name, global.outfitArray[i].image,global.outfitArray[i].date,global.outfitArray[i].tags);
      }
    }
  }
  global.closetLoaded = 1;
  

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
    setAddingTag("");
  }

  function showModalEdit() {
    setEditOutfitMenu(true);
    setAddingName(outfitArray[index].name);
  }

  function showModalTag() {
    setAddTagMenu(true);
    setAddingTag("");
  }

  function showModalSort() {
    setSortMenu(true);
    setAddingTag("");
  }

  // Hides all modal menus.
  function hideModalAll() {
    setAddingOutfitMenu(false);
    setEditOutfitMenu(false);
    setAddTagMenu(false);
    setSortMenu(false);
  }

  //----------------------------
  // Outfit Management Functions
  //----------------------------
  // Adds an outfit into the closet.
  function addOutfit(o_name, o_image, o_tag) {
    if (o_name != "" && o_image != "") {
      let outfit = {
        name: o_name,
        date: "N/A",
        image: o_image,
        tags: o_tag
      };
      if (!allAddedTags.includes(o_tag)) {allAddedTags.push(o_tag)};
      global.outfitArray = outfitArray.concat(outfit);
      setOutfitArray(outfitArray.concat(outfit));
      let newOutfits = numOutfits + 1;
      let newIndex = numOutfits;
      setNumOutfits(newOutfits);
      setIndex(newIndex);
      addNewOutfit(global.userEmail, o_name, "", o_image, o_tag);
    }
  }
  // Deletes an outfit from the closet.
  function deleteOutfit() {
    if(global.outfitArray != -1){
      for(var i = 0; i < global.outfitArray.length; i++){
        if(global.outfitArray[i] != null && global.outfitArray[i].name === outfitArray[index].name){
          deleteOutfitDB(global.outfitArray[i].id);
          break;
        }
      }
    }
    let tempArray = outfitArray;
    tempArray.splice(index, 1);
    global.outfitArray = tempArray;
    setOutfitArray(tempArray);

    let newOutfits = numOutfits - 1;
    let newIndex = index - 1;
    if (newIndex < 0) { newIndex = 0; }
    setNumOutfits(newOutfits);
    setIndex(newIndex);
    
  }

  // Changes the outfit at the current index to the new values provided.
  function changeOutfit(o_name, o_image) {
    
    for(var i = 0; i < global.outfitArray.length; i++){
      if(global.outfitArray[i] != null && global.outfitArray[i].name === outfitArray[index].name){
        if(o_name == undefined) {
          o_name = outfitArray[index].name;
        }
        if(o_image == undefined) {
          o_image = outfitArray[index].image;
        }
        updateOutfit(global.outfitArray[i].id, global.userEmail, o_name, global.outfitArray[i].dateCreated,"", o_image, outfitArray[index].tags, global.outfitArray[i].lastWorn);
        break;
      }
    }
    
    if (o_name != "" && o_image != "") {
      let outfit = {
        name: o_name,
        date: "N/A",
        image: o_image,
        tags: ""
      };
      let tempArray = outfitArray;
      tempArray.splice(index, 1, outfit);

      global.outfitArray = tempArray;
      setOutfitArray(tempArray);
    }
  }

  // Adds a tag to an outfit's tag list if it is not present.
  function addTag(tag) {
    console.log("Tag: " + tag);
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
          if (!allAddedTags.includes(tag)) {allAddedTags.push(tag)};

          global.outfitArray = tempArray;
          setOutfitArray(tempArray);
        }
      } else {
        let tempArray = outfitArray;
        let replaceOutfit = outfitArray[index];
        replaceOutfit.tags = tag;
        tempArray.splice(index, 1, replaceOutfit);
        if (!allAddedTags.includes(tag)) {allAddedTags.push(tag)};

        global.outfitArray = tempArray;
        setOutfitArray(tempArray);
      }
    }
    for(var i = 0; i < global.outfitArray.length; i++){
      if(global.outfitArray[i] != null && global.outfitArray[i].name === outfitArray[index].name){
        updateOutfit(global.outfitArray[i].id, global.userEmail, outfitArray[index].name, global.outfitArray[i].dateCreated, "", outfitArray[index].image, outfitArray[index].tags, global.outfitArray[i].lastWorn)
        break;
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
        if (strArray[i] !== undefined) {
          if (strArray[i].toUpperCase() === tag.toUpperCase()) {
            dupeArray.splice(i, 1);
          }
        }
      }
      let tempArray = outfitArray;
      let replaceOutfit = outfitArray[index];
      replaceOutfit.tags = dupeArray.toString();
      tempArray.splice(index, 1, replaceOutfit);

      global.outfitArray = tempArray;
      setOutfitArray(tempArray);
    }
    for(var i = 0; i < global.outfitArray.length; i++){
      if(global.outfitArray[i] != null && global.outfitArray[i].name === outfitArray[index].name){
        updateOutfit(global.outfitArray[i].id, global.userEmail, outfitArray[index].name, "","", outfitArray[index].image, outfitArray[index].tags, global.outfitArray[i].lastWorn)
        break;
      }
    }
  }

  // Removes a tag from an outfit's tag list if it is present.
  function sortByTag() {
    let tempArray = [];
    for (let i = 0; i < outfitArray.length; i++) {
      if (outfitArray[i].tags.includes(addingTag)) {
        tempArray.push(outfitArray[i]);
      }
    }
    for (let i = 0; i < outfitArray.length; i++) {
      if (!tempArray.includes(outfitArray[i])) {
        tempArray.push(outfitArray[i]);
      }
    }
    setIndex(0);
    setOutfitArray(tempArray);
  }

  function restoreSort() {
    let tempArray = outfitArray;
    setNumOutfits(tempArray.length);
    setIndex(0);
    setOutfitArray(tempArray);
  }

  function clearTags() {
    let tempArray = outfitArray;
    let replaceOutfit = outfitArray[index];
    replaceOutfit.tags = "";
    tempArray.splice(index, 1, replaceOutfit);
    setOutfitArray(tempArray);
    for(var i = 0; i < global.outfitArray.length; i++){
      if(global.outfitArray[i] != null && global.outfitArray[i].name === outfitArray[index].name){
        updateOutfit(global.outfitArray[i].id, global.userEmail, outfitArray[index].name, "","", outfitArray[index].image, outfitArray[index].tags, global.outfitArray[i].lastWorn)
        break;
      }
    }
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  function onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
      case SWIPE_LEFT:
        break;
      case SWIPE_RIGHT:
        break;
    }
  }

  if (numOutfits > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.containerSettings}>
          <Button icon="cog" mode="outlined" onPress={showModalSort} style={styles.settingsButton}>
            Sort By
          </Button>
        </View>
        
        <Text variant="headlineSmall" style={styles.outfitText}>{outfitArray[index].name}</Text>
        <Text variant="headerLarge" style={styles.dateText}>Last Worn: {outfitArray[index].lastWorn}</Text>
        <Text variant="headerLarge" style={styles.dateText}>Tags: {outfitArray[index].tags}</Text>
        <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        >
        <View style={styles.imageContainer}>
          <Image
            style={styles.closetPicture}
            source={{ uri: "data:image/png;base64,"+outfitname }}
          />
        </View>
        </GestureRecognizer>
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
            Tags
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
            <TextInput
              label="Tag Name (Optional)"
              value={addingTag}
              onChangeText={addingTag => setAddingTag(addingTag)}
            />
            <DropDown
              label={"Select Existing Tag"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={addingTag}
              setValue={setAddingTag}
              list={tagList}
            />
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); addOutfit(addingName, global.outfitBase64, addingTag)}}>
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
            <DropDown
              label={"Select Existing Tag"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={addingTag}
              setValue={setAddingTag}
              list={tagList}
            />
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); addTag(addingTag)}}>
              Confirm Tag Addition
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); removeTag(addingTag)}}>
              Confirm Tag Removal
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="trash-can" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); clearTags()}}>
              Clear Tags
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
              Cancel
            </Button>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={sortMenu} style={styles.modalMenu} dismissable={false}>
            <Text variant="headlineSmall" style={styles.outfitText}>Sort Closet</Text>
            <View style={styles.buttonSpacing}></View>
            <DropDown
              label={"Select Existing Tag"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={addingTag}
              setValue={setAddingTag}
              list={tagList}
            />
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(), sortByTag()}}>
              Sort By Tag
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
              Sort By Date
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(), restoreSort()}}>
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
            <TextInput
              label="Tag Name (Optional)"
              value={addingTag}
              onChangeText={addingTag => setAddingTag(addingTag)}
            />
            <DropDown
              label={"Select Existing Tag"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={addingTag}
              setValue={setAddingTag}
              list={tagList}
            />
            
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); addOutfit(addingName, global.outfitBase64, addingTag)}}>
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
  containerSettings: {
    paddingTop: 0,
    paddingRight: 10,
    backgroundColor: '#f5fafc',
    flexDirection: "row",
    alignSelf: 'flex-end',
  },
  settingsButton: {
    width: 120,
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
    height: 280,
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

