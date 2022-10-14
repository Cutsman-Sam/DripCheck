import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Portal, Modal, TextInput } from 'react-native-paper';


//addOutfit('Casual Blue Coat', '10/8/22', 'https://www.stitchfix.com/men/blog/wp-content/uploads/2017/09/20-10-20_Set_2_M_OLD_v2_1x1-scaled.jpeg');
//addOutfit('Shark Onesie', '10/9/22', 'https://cdn.shopify.com/s/files/1/0768/3211/products/Shark_X-Tall_Animal_Kigurumi_Adult_Onesie_Costume_Pajamas_Blue_Navy_Side\
//_SZC-KG-2842_SZC-KG-2842XL_600x.jpg?v=1573783083');
//addOutfit('Purdue Shirt', '10/10/22', 'https://m.media-amazon.com/images/I/5115LtQCd7L._AC_UX679_.jpg');
//addOutfit('Akira Hoodie', '10/11/22', 'https://m.media-amazon.com/images/I/61fD7zP8XeS._AC_UX679_.jpg');
//addOutfit('Saul Drip', '10/12/22', 'https://i.etsystatic.com/31485601/r/il/b36363/4123809102/il_794xN.4123809102_prep.jpg');

function ClosetScreen(props) {
  const [addingOutfitMenu, setAddingOutfitMenu] = React.useState(false);
  const [editOutfitMenu, setEditOutfitMenu] = React.useState(false);

  const [addingName, setAddingName] = React.useState("");
  const [addingDate, setAddingDate] = React.useState("");
  const [addingOutfit, setAddingOutfit] = React.useState("");

  const [nameArray, setNameArray] = React.useState([]);
  const [dateArray, setDateArray] = React.useState([]);
  const [outfitArray, setOutfitArray] = React.useState([]);
  const [numOutfits, setNumOutfits] = React.useState(0);
  const [index, setIndex] = React.useState(0);

  let outfitname = outfitArray[index];

  function nextOutfit() {
    if (index < numOutfits - 1) {
      setIndex(index + 1);
    }
    console.log(index)
  }

  function prevOutfit() {
    if (index > 0) {
      setIndex(index - 1);
    }
    console.log(index)
  }

  function showModal() {
    setAddingOutfitMenu(true);
    setAddingName("");
    setAddingDate("");
    setAddingOutfit("");
  }

  function hideModal() {
    setAddingOutfitMenu(false);
  }

  function showModalEdit() {
    setEditOutfitMenu(true);
    setAddingName(nameArray[index]);
    setAddingDate(dateArray[index]);
    setAddingOutfit(outfitArray[index]);
  }

  function hideModalEdit() {
    setEditOutfitMenu(false);
  }

  function addOutfit(name, date, image) {
    if (name != "" && date != "" && image != "") {
      setNameArray(nameArray.concat(name));
      setDateArray(dateArray.concat(date));
      setOutfitArray(outfitArray.concat(image));
      let newOutfits = numOutfits + 1;
      let newIndex = numOutfits;
      setNumOutfits(newOutfits);
      setIndex(newIndex);
    }
  }

  function changeOutfit(name, date, image) {
    if (name != "" && date != "" && image != "") {
      let tempArray1 = nameArray;
      tempArray1.splice(index, 1, name);
      setNameArray(tempArray1);

      let tempArray2 = dateArray;
      tempArray2.splice(index, 1, date);
      setDateArray(tempArray2);
      
      let tempArray3 = outfitArray;
      tempArray3.splice(index, 1, image);
      setOutfitArray(tempArray3);
    }
  }

  function deleteOutfit() {
    let tempArray1 = nameArray;
    tempArray1.splice(index, 1);
    setNameArray(tempArray1);

    let tempArray2 = dateArray;
    tempArray2.splice(index, 1);
    setDateArray(tempArray2);
    
    let tempArray3 = outfitArray;
    tempArray3.splice(index, 1);
    setOutfitArray(tempArray3);

    let newOutfits = numOutfits - 1;
    let newIndex = index - 1;
    if (newIndex < 0) { newIndex = 0; }
    setNumOutfits(newOutfits);
    setIndex(newIndex);
  }

  if (numOutfits > 0) {
    return (
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.outfitText}>{nameArray[index]}</Text>
        <Text variant="headerLarge" style={styles.dateText}>Last Worn: {dateArray[index]}</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.closetPicture}
            source={{ isStatic: true, uri: outfitname }}
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
        <Button icon="pencil" mode="contained" style={styles.addOutfit} onPress={showModalEdit}>
          Edit Outfit
        </Button>



        <Portal>
          <Modal visible={editOutfitMenu} style={styles.modalMenu} dismissable={false}>
            <Text variant="headlineSmall" style={styles.outfitText}>Edit Outfit</Text>
            <View style={styles.buttonSpacing}></View>
            <TextInput
              label="Outfit Name"
              value={addingName}
              onChangeText={addingName => setAddingName(addingName)}
            />
            <TextInput
              label="Date Worn"
              value={addingDate}
              onChangeText={addingDate => setAddingDate(addingDate)}
            />
            <TextInput
              label="Image Path"
              value={addingOutfit}
              onChangeText={addingOutfit => setAddingOutfit(addingOutfit)}
            />
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalEdit(); changeOutfit(addingName, addingDate, addingOutfit)}}>
              Confirm Changes
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalEdit()}}>
              Cancel Changes
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="trash-can" mode="contained" style={styles.modalButton} onPress={() => {hideModalEdit(); deleteOutfit()}}>
              Delete Outfit
            </Button>
          </Modal>
        </Portal>



        <Portal>
          <Modal visible={addingOutfitMenu} style={styles.modalMenu} dismissable={false}>
            <Text variant="headlineSmall" style={styles.outfitText}>Outfit Details</Text>
            <View style={styles.buttonSpacing}></View>
            <TextInput
              label="Outfit Name"
              value={addingName}
              onChangeText={addingName => setAddingName(addingName)}
            />
            <TextInput
              label="Date Worn"
              value={addingDate}
              onChangeText={addingDate => setAddingDate(addingDate)}
            />
            <TextInput
              label="Image Path"
              value={addingOutfit}
              onChangeText={addingOutfit => setAddingOutfit(addingOutfit)}
            />
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModal(); addOutfit(addingName, addingDate, addingOutfit)}}>
              Confirm Outfit
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModal()}}>
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
            <TextInput
              label="Outfit Name"
              value={addingName}
              onChangeText={addingName => setAddingName(addingName)}
            />
            <TextInput
              label="Date Worn"
              value={addingDate}
              onChangeText={addingDate => setAddingDate(addingDate)}
            />
            <TextInput
              label="Image Path"
              value={addingOutfit}
              onChangeText={addingOutfit => setAddingOutfit(addingOutfit)}
            />
            <View style={styles.buttonSpacing}></View>
            <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModal(); addOutfit(addingName, addingDate, addingOutfit)}}>
              Confirm Outfit
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModal()}}>
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
    paddingTop: 10,
  },
  dateText: {
    paddingBottom: 10,
  },
  closetPicture: {
    height: 380,
    width: 280,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black"
  },
  addOutfit: {
    borderWidth: 1,
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

