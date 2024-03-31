import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";


export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCfXf2vRt1PBcNqocYryUPeANhYrlKBhfQ",
    authDomain: "midterm-61805.firebaseapp.com",
    projectId: "midterm-61805",
    storageBucket: "midterm-61805.appspot.com",
    messagingSenderId: "329510327781",
    appId: "1:329510327781:web:8eba3cb1ec4ca58a0f8b0c",
    measurementId: "G-SY4405391N"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  

  // This is a test commit
  return (

    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
