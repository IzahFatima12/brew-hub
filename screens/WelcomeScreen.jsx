// WelcomeScreen.jsx
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../config/colors';
import bgimage from "../assets/images/BG1.jpg";

const WelcomeScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, imageUri, setImageUri }) => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={bgimage} style={{ width: "100%", height: "100%" }}>
      <View style={{ paddingHorizontal: 80, flex: 1 }}>
        <View style={{ flex: 1 }}></View>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: 10, marginBottom: 10 }}>
            <Text style={{ color: COLORS.Gingerbread, fontSize: 35, fontWeight: "bold", textAlign: "center", fontFamily: 'CedarvilleCursive-Regular' }}>
              Brewhub: Your cozy coffee hug!
            </Text>
            <Text style={{ color: COLORS.Gingerbread, fontSize: 18, fontWeight: "bold", textAlign: "center", paddingBottom: 40 }}>
              Every sip unlocks a new memory.
            </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Login", {
                email,
                setEmail,
                password,
                setPassword,
                isLogin,
                setIsLogin,
                handleAuthentication,
                imageUri,
                setImageUri
              });
            }}>
              <View style={{ width: 300, height: 40, backgroundColor: "#C67C4E", borderRadius: 10, alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", textAlign: "center" }}> Get Started </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
