import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View } from 'react-native';

//View -> UIView
export default function App() {
  let x = 1;
  console.log("test debug: app started") //remove later

  
  return (
    <View style={styles.container}>
      <Text>Joe Test</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
