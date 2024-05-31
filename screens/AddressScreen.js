import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native"; // Import Alert from react-native
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import COLORS from '../config/colors'; 

const AddressScreen = () => {
  const navigation = useNavigation();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Function to check if all fields are filled
  const areAllFieldsFilled = () => {
    return street.trim() !== "" && city.trim() !== "" && state.trim() !== "" && zipCode.trim() !== "";
  };

  // Function to handle button press
  const handlePress = () => {
    if (areAllFieldsFilled()) {
      navigation.navigate("payment", {
        street,
        city,
        state,
        zipCode,
      });
    } else {
      Alert.alert("Please fill in all fields."); // Show alert if fields are not filled
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.safeAreaTop}>
        <Text style={styles.safeAreaText}>Address Page</Text>
      </View>
      <Text style={styles.label}>Street:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your street address"
        value={street}
        onChangeText={setStreet}
      />
      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your city"
        value={city}
        onChangeText={setCity}
      />
      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your state"
        value={state}
        onChangeText={setState}
      />
      <Text style={styles.label}>Zip Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your zip code"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric" // Set keyboard type to numeric for zip code
      />
      <Button
        title="Submit Address"
        onPress={handlePress} // Use the handlePress function
        buttonStyle={[styles.button, !areAllFieldsFilled() && styles.disabledButton]} // Apply style to the button
        disabled={!areAllFieldsFilled()} // Disable button based on field validation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 100,
    backgroundColor: COLORS.brown,
  },
  safeAreaTop: {
    backgroundColor: COLORS.blue, // Background color for safe area top
    alignItems: "center", // Center content horizontally
    paddingVertical: 10, // Vertical padding inside safe area top
  },
  safeAreaText: {
    fontSize: 35,
    color: COLORS.Gingerbread,
  },
  label: {
    paddingBottom: 10,
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.Gingerbread,
  },
  input: {
    height: 40,
    borderColor: COLORS.Tawny,
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.Gingerbread, // Background color for the button
    borderRadius: 8, // Border radius for rounded corners
    paddingVertical: 12, // Vertical padding inside the button
    paddingHorizontal: 20, // Horizontal padding inside the button
  },
  disabledButton: {
    backgroundColor: COLORS.Gray, // Background color for disabled button
  },
});

export default AddressScreen;
