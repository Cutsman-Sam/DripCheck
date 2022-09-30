import { StatusBar } from 'expo-status-bar';  //status-bar replaced with 'react'
import { StyleSheet, Text, View } from 'react-native';

//View -> UIView
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Drip Check</Text>
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
