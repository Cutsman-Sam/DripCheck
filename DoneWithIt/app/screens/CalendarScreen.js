import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Portal, Modal, TextInput } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { getCurrentDate, addNewDay, deleteDay, updateOutfit } from '../utilities/requestData';
global.trueDay = new Date();

function CalendarScreen(navigation) {
  const outfitSample = {
    name: "OutfitTest",
    date: "N/A",
    image: "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA2RJREFUeJztnTGO00AUhh2UAyC6lZDo4BR7DJBo6Gjp6HKDdJGoVjRchVPsioYqx1gqo2Bi2ZmM/d7k+75qWS32RPre7zfjsbN5+er1cxfMYX/fPT4du28Pv87+u1Va+BwvogcgsSgAHAWAowBwFACOAsBRADgKAEcB4CgAHAWAs40ewBjv3t51h/1dlWN9+fqzynGmOOzvVzlPTVIK8Ph0jB5CMa2NPaUAte6e9Xfj1ibz3b8h9gBwFACOAsBRADgKAEcB4CgAHAWAowBwFACOAsBRADgKAEcB4CgAHAWAowBwwncEHX8//P15t+u6uzefFz/PHJYaRzZMADjhCTCkr9TSCjxX6btdneN03e0lgwkAJzwB+ooaVtzcJJh7bb+0cseOO/x964lgAsAJT4CeS5Ng6Wv02HFKkyorJgCcTYb3BJ5jqWt7bVqfLZgAcNImQE8rFdbKOIeYAHA2P75/TJcAp8/zT/UC2SqstXWCbWvPs0tdUvUAp2/XHqukVq61rSSBPQCcdAnw/sOnf343d0Vu6u+jyJ4EaZaCKWR7kVSzAkz1BFnJ1nQ3K0CrZHuBVJoeIPu18lqyfj4TIIileoFLX4qpAEFk6QUUIIjavUDpSzFdCIKjAHDCLwFR3fHa5x2uW2TZS2gCwAlPgLWZ2mV8bUVeujIZvd9hm21tWtYFsyFkWOFT+w1KK+/SJ5lqVnjJt6xso9emSx7clP8pLWRcD3CrlBayswA4mASYusbXnpfPnQ2U7meoNU4TAA4mAXqmZgG1zzNk7nnHZi21x2kCwHFH0Epc+/lMAFkEBYCjAHCqzAK8obQ8S/VE1aaBlJtKt0aVWcDpU73Xcmm3nH32kH189gBwml0JbO2ZwJ5s/VKzArRKtl4pnQBTu2d9L0Bd7AHgpN0UOpYEY3+XhVYqvwezKVTOE74ptJRsldXqrMQeAE6a/QBDfFv4OpgAcNIlwNyKiqq81it+iAkAJ00ClFbW2t8adu1xs2ECwAlPgNrX1KXn461X/BATAE7au4G1/7/fHn4eEwBOeA8gsZgAcBQAjgLAUQA4CgBHAeAoABwFgKMAcBQAjgLAUQA4CgBHAeAoABwFgKMAcBQAjgLAUQA4CgBHAeAoABwFgKMAcBQAjgLAUQA4CgBHAeAoAJw/erZb8smKGLkAAAAASUVORK5CYII=",
    tags: "Tag1, Tag2, Tag3"
  };

  const [dayArray, setDayArray] = React.useState([]);
  const [assigningMenu, setAssigningMenu] = React.useState(false);
  const [notesMenu, setNotesMenu] = React.useState(false);

  const [currentDay, setCurrentDay] = React.useState(null);

  const [addNotes, setAddNotes] = React.useState("");

  const [index, setIndex] = React.useState(0);

  const [notesOutfit, setNotesOutfit] = React.useState(outfitSample);

  //Get days from database
  if(global.dayArray.length != 0 && global.calendarLoaded == null){
    var arr = new Array();
    var fit;
    for(var i = 0; i < global.dayArray.length; i++){
      if(global.dayArray[i] != null){
        for(var j = 0; j < global.outfitArray.length; j++){
          if(global.outfitArray[j] != null && global.outfitArray[j].id == global.dayArray[i].outfitId){
              fit = global.outfitArray[j];
              break;
          }
        }
        let outfit = {
          name: fit.name,
          date: fit.date,
          image: fit.image,
          tags: fit.tags,
          id: fit.id,
          description: ""
        };
        //console.log(outfit)
        let day = {
            outfit: outfit,
            notes: "",
            assignedDate: global.dayArray[i].date
        };
        arr.push(day);
        
        //addOldOutfit(global.outfitArray[i].name, global.outfitArray[i].image,global.outfitArray[i].date,global.outfitArray[i].tags);
      }
    }
    
    setDayArray(arr);
  }
  global.calendarLoaded = 1;

  // Marks days with outfits on them
  let markedDaysArray = [];
  for (let i = 0; i < dayArray.length; i++) {
    let str = dayArray[i].assignedDate.dateString;
    markedDaysArray.push(str);
  }
  let markedDays = {};
  markedDaysArray.forEach((day) => {
    markedDays[day] = {
        marked: true,
    };
  });


  let iter = [];
  for (let i = 0; i < global.outfitArray.length; i++) {
    if (global.outfitArray[i] !== undefined) {
      iter.push(global.outfitArray[i]);
    }
  }
  

  let c_outfit = iter[index]

  function showModalAssign() {
    setAssigningMenu(true);
  }

  function showModalNotes() {
    setNotesMenu(true);
    for (let i = 0; i < dayArray.length; i++) {
      if (dayArray[i].assignedDate.dateString === global.trueDay.dateString) {
        setNotesOutfit(dayArray[i].outfit)
        setAddNotes(dayArray[i].notes)
      }
    }
  }

  // Hides all modal menus.
  function hideModalAll() {
    setAssigningMenu(false);
    if (notesMenu) {
      for (let i = 0; i < dayArray.length; i++) {
        if (dayArray[i].assignedDate.dateString === global.trueDay.dateString) {
          dayArray[i].notes = addNotes;
        }
      }
    }
    setNotesMenu(false);
  }

  function nextOutfit() {
    if (index < iter.length - 1) {
      setIndex(index + 1);
    }
  }

  // Shifts the outfit index over by one to the left, bounded
  function prevOutfit() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function addCalendarDay(o_outfit, o_day) {
    let calendarDay = {
      outfit: o_outfit,
      assignedDate: o_day,
      notes: ""
    };
    let id = null;
    let outfit = null;
    for (let i = 0; i < global.outfitArray.length; i++) {
      if (o_outfit === global.outfitArray[i]) {
        global.outfitArray[i].date = o_day;
        id = global.outfitArray[i].id;
        outfit = global.outfitArray[i];
      }
    }
    let insertIndex = 0;
    let arr = dayArray;
    for (insertIndex = 0; insertIndex < arr.length; insertIndex++) {
      if (arr[insertIndex].assignedDate > calendarDay.assignedDate) {
        break;
      }
    }
    arr.splice(insertIndex, 0, calendarDay);
    setDayArray(arr);
    addNewDay(global.userEmail, id, "", calendarDay.assignedDate);
    
    //updates lastWorn in global array if the new date is earlier than the last date
    if(outfit.lastWorn.substring(0,4) <  o_day.year) { //just year is larger (more recent)
      outfit.lastWorn = o_day.dateString;
      updateOutfit(id, global.userEmail, outfit.name, outfit.dateCreated,"", outfit.image, outfit.tags, outfit.lastWorn);

    } else if (outfit.lastWorn.substring(0,4) ==  o_day.year && outfit.lastWorn.substring(5,7) <  o_day.month) { //year is equal, just month is larger (more recent)
      outfit.lastWorn = o_day.dateString;
      updateOutfit(id, global.userEmail, outfit.name, outfit.dateCreated,"", outfit.image, outfit.tags, outfit.lastWorn);

    } else if (outfit.lastWorn.substring(0,4) ==  o_day.year && outfit.lastWorn.substring(5,7) ==  o_day.month && outfit.lastWorn.substring(8) <  o_day.day) { //year and month are same, just day is larger
      outfit.lastWorn = o_day.dateString;
      updateOutfit(id, global.userEmail, outfit.name, outfit.dateCreated,"", outfit.image, outfit.tags, outfit.lastWorn);
      
    }
  }

  function removeCalendarDay(o_day, o_outfit) {

    //get outfit in global array to find last date outfit was worn.
    let outfit = null;
    for (let i = 0; i < global.outfitArray.length; i++) {
      if(global.outfitArray[i] != null) {
        if (o_outfit.name === global.outfitArray[i].name) {
          outfit = global.outfitArray[i];
        }
      }
    }
    let prevWorn = "0000-00-00";
    
    let arr = dayArray;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].assignedDate.dateString === o_day.dateString) {
        arr.splice(i, 1);
        break;
      }
    }

    setDayArray(arr);
    for(var i = 0; i < global.dayArray.length; i++){
      
      if(global.dayArray[i] != null && global.dayArray[i].date.dateString === o_day.dateString) {
        deleteDay(global.dayArray[i].id)
        //TODO: on outfit removal, find the last day the outfit was worn. 

        break;
      }
      //find last date outfit was worn before removal day
      /*else if(global.dayArray[i] != null && global.dayArray[i].outfitId === outfit.id) {
        prevWorn = global.dayArray[i].date.dateString
        console.log(prevWorn);
      }*/
    }


  }
  
  
  
  if (c_outfit != null) {
  return (
    <>
    <View style={styles.container}>
        <Calendar
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate = {Date()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          setCurrentDay(day);
          global.trueDay = day;
          if (outfitArray.length != 0) {
            let alreadyAssigned = false;
            for (let i = 0; i < markedDaysArray.length; i++) {
              if (day.dateString === markedDaysArray[i]) {
                alreadyAssigned = true;
              }
            }
            if (!alreadyAssigned) {
              showModalAssign();
            } else {
              showModalNotes();
            }
          }
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMM d, yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          //console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={0}

        customHeaderTitle={<Text>Outfits</Text>}
        
        markedDates={markedDays}
      />
      </View>


      <Portal>
        <Modal visible={assigningMenu} style={styles.modalMenu} dismissable={false}>
          <Text variant="headlineSmall" style={styles.outfitText}>Outfit Worn:</Text>
          <Text variant="bodyLarge" style={styles.outfitText}>{c_outfit.name}</Text>
          <View style={styles.buttonSpacing}></View>
          <Image
            style={styles.closetPicture}
            source={{ uri: "data:image/png;base64,"+ c_outfit.image }}
          />
          <View style={styles.buttonRowContainer}>
            <Button icon="arrow-left-bold" mode="contained-tonal" style={styles.navButtons} onPress={prevOutfit}>
              Previous
            </Button>
            <View style={styles.buttonSpacing}></View>
            <Button icon="arrow-right-bold" mode="contained-tonal" style={styles.navButtons} onPress={nextOutfit} contentStyle={{flexDirection: 'row-reverse'}}>
              Next
            </Button>
          </View>
          <View style={styles.buttonSpacing}></View>
          <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); addCalendarDay(c_outfit, currentDay)}}>
            Confirm
          </Button>
          <View style={styles.buttonSpacing}></View>
          <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
            Cancel
          </Button>
        </Modal>
      </Portal>


      <Portal>
        <Modal visible={notesMenu} style={styles.modalMenu} dismissable={false}>
          <Text variant="headlineSmall" style={styles.outfitText}>Assigned Outfit:</Text>
          <Text variant="bodyLarge" style={styles.outfitText}>{notesOutfit.name}</Text>
          <View style={styles.buttonSpacing}></View>
          <Image
            style={styles.closetPicture}
            source={{ uri: "data:image/png;base64,"+ notesOutfit.image }}
          />
          <View style={styles.buttonSpacing}></View>
          <TextInput label="Notes" value={addNotes} onChangeText={addNotes => setAddNotes(addNotes)}/>
          <Button icon="trash-can" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); removeCalendarDay(currentDay,c_outfit)}}>
            Clear Day
          </Button>
          <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
            Close
          </Button>
        </Modal>
      </Portal>
    
    </>
  );
  }
  return (
    <View>
      <Text style={styles.outfitText}> Before using the calendar, be sure to add some outfits to your closet!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fafc',
    alignItems: 'center',
    paddingTop: 50
  },
  modalMenu: {
    backgroundColor: '#ffffff',
    padding: 20
  },
  modalButton: {
    width: 190,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center"
  },
  buttonRowContainer: {
    alignSelf: "center",
    paddingTop: 10,
    flexDirection: "row",
  },
  buttonSpacing: {
    padding: 10,
  },
  outfitText: {
    alignSelf: "center",
    paddingTop: 10,
  },
  navButtons: {
    width: 120,
    borderWidth: 1,
    borderColor: "black",
  },
  closetPicture: {
    height: 280,
    width: 280,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center"
  },
});

export default CalendarScreen;

