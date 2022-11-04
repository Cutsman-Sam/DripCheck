import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button, Portal, Modal, TextInput } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

function CalendarScreen(navigation) {
  const [dayArray, setDayArray] = React.useState([]);
  const [assigningMenu, setAssigningMenu] = React.useState(false);
  const [notesMenu, setNotesMenu] = React.useState(false);

  const [currentDay, setCurrentDay] = React.useState(null);

  let outfitSample = {
    name: "OutfitTest",
    date: "N/A",
    image: "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA2RJREFUeJztnTGO00AUhh2UAyC6lZDo4BR7DJBo6Gjp6HKDdJGoVjRchVPsioYqx1gqo2Bi2ZmM/d7k+75qWS32RPre7zfjsbN5+er1cxfMYX/fPT4du28Pv87+u1Va+BwvogcgsSgAHAWAowBwFACOAsBRADgKAEcB4CgAHAWAs40ewBjv3t51h/1dlWN9+fqzynGmOOzvVzlPTVIK8Ph0jB5CMa2NPaUAte6e9Xfj1ibz3b8h9gBwFACOAsBRADgKAEcB4CgAHAWAowBwFACOAsBRADgKAEcB4CgAHAWAowBwwncEHX8//P15t+u6uzefFz/PHJYaRzZMADjhCTCkr9TSCjxX6btdneN03e0lgwkAJzwB+ooaVtzcJJh7bb+0cseOO/x964lgAsAJT4CeS5Ng6Wv02HFKkyorJgCcTYb3BJ5jqWt7bVqfLZgAcNImQE8rFdbKOIeYAHA2P75/TJcAp8/zT/UC2SqstXWCbWvPs0tdUvUAp2/XHqukVq61rSSBPQCcdAnw/sOnf343d0Vu6u+jyJ4EaZaCKWR7kVSzAkz1BFnJ1nQ3K0CrZHuBVJoeIPu18lqyfj4TIIileoFLX4qpAEFk6QUUIIjavUDpSzFdCIKjAHDCLwFR3fHa5x2uW2TZS2gCwAlPgLWZ2mV8bUVeujIZvd9hm21tWtYFsyFkWOFT+w1KK+/SJ5lqVnjJt6xso9emSx7clP8pLWRcD3CrlBayswA4mASYusbXnpfPnQ2U7meoNU4TAA4mAXqmZgG1zzNk7nnHZi21x2kCwHFH0Epc+/lMAFkEBYCjAHCqzAK8obQ8S/VE1aaBlJtKt0aVWcDpU73Xcmm3nH32kH189gBwml0JbO2ZwJ5s/VKzArRKtl4pnQBTu2d9L0Bd7AHgpN0UOpYEY3+XhVYqvwezKVTOE74ptJRsldXqrMQeAE6a/QBDfFv4OpgAcNIlwNyKiqq81it+iAkAJ00ClFbW2t8adu1xs2ECwAlPgNrX1KXn461X/BATAE7au4G1/7/fHn4eEwBOeA8gsZgAcBQAjgLAUQA4CgBHAeAoABwFgKMAcBQAjgLAUQA4CgBHAeAoABwFgKMAcBQAjgLAUQA4CgBHAeAoABwFgKMAcBQAjgLAUQA4CgBHAeAoAJw/erZb8smKGLkAAAAASUVORK5CYII=",
    tags: "Tag1, Tag2, Tag3"
  };


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


  function showModalAssign() {
    setAssigningMenu(true);
  }

  function showModalNotes() {
    setNotesMenu(true);
  }

  // Hides all modal menus.
  function hideModalAll() {
    setAssigningMenu(false);
    setNotesMenu(false);
  }

  function addCalendarDay(o_outfit, o_day) {
    let calendarDay = {
      outfit: o_outfit,
      assignedDate: o_day,
    };
    console.log(calendarDay);
    setDayArray(dayArray.concat(calendarDay));
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 50}}>
        <Calendar
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate = {Date()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          setCurrentDay(day);
          console.log('selected day', day);
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
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMM d, yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
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
          <Text variant="headlineSmall" style={styles.outfitText}>{outfitSample.name}</Text>
          <Image
            style={styles.closetPicture}
            source={{ uri: "data:image/png;base64,"+ outfitSample.image }}
          />
          <View style={styles.buttonSpacing}></View>
          <Button icon="check-bold" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll(); addCalendarDay(outfitSample, currentDay)}}>
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
          <Button icon="close-thick" mode="contained" style={styles.modalButton} onPress={() => {hideModalAll()}}>
            POPOPO Menu
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fafc',
    alignItems: 'center',
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

