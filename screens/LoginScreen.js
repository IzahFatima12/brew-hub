import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase'; // Ensure correct import path
import bg from '../assets/images/login.jpg';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({isLogin, setIsLogin, cation, imageUri, setImageUri }) => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async(email, password) => {
    await createUserWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log('User created:', user);
    });
    navigation.navigate('Home', { imageUri } );
  };

  const handleLogin = async(email, password) => {
    await signInWithEmailAndPassword(getAuth(), email, password);
    navigation.navigate('Home', { imageUri } );
  }


  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    // // Sign in anonymously for this example
    // signInAnonymously(auth).catch((error) => {
    //   console.error("Error signing in anonymously: ", error);
    // });
  }, []);

  const pickImage = async () => {
    if (hasPermission === null) {
      Alert.alert('Permission', 'Requesting permissions...');
      return;
    }
    if (hasPermission === false) {
      Alert.alert('Permission', 'Permission to access media library is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("ImagePicker result:", result);

    if (!result.canceled) {
      setLoading(true); 
      try {
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        // Generate a unique filename for the image
        const imageName = `${Date.now()}-${result.assets[0].fileName}`;

        // Create a reference to the Firebase Storage location
        const storageRef = ref(storage, `profilePictures/${imageName}`);

        // Upload the image to Firebase Storage
        const snapshot = await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Set the image URI state with the download URL
        setImageUri(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload Error', 'There was an error uploading the image. Please try again.');
      }
      finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <ImageBackground source={bg} style={styles.backgroundImage}>
      <View style={styles.authContainer}>
        
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        {!isLogin && (
          <>
            <Button title="Pick an image from camera roll" onPress={pickImage} color="#6F4E37" />
            {loading ? (
              <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
            ) : (
              imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            )}
          </>
        )}
        <View style={styles.buttonContainer}>
          {isLogin ? (
            <Button title="Sign In" onPress={() => handleLogin(email, password)} color="#6F4E37" />
          ) : (
            <Button title="Sign up" onPress={() => handleSignup(email, password)} color="#6F4E37" />
          )}
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
   
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
     color :"#6F4E37",
  },
  bottomContainer: {
    marginTop: 20,
  },
  toggleText: {
    color: '#6F4E37',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;