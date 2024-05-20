import { View, Text,ImageBackground } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'



const WelcomeScreen = ({navigation}) => {
  
    return (
    <ImageBackground source={require("../assets/images/bg.png")}
    style={{
      width: "100%",
      height: "100%",
    }}>

    <View style={{
     paddingHorizontal: 80,
     flex:1
   
  }}>
    

    <View
      style={{
        flex: 1,
      }}
    ></View>

    <View>
      <View style ={{
        justifyContent :"center",
        
        alignItems:"center",
        flexDirection:'column',  
        gap:10,
        marginBottom:10
        
      }}>
      <Text 
           style={{
          color: "white",
          fontSize: 35,
          fontWeight: "bold",
          textAlign:"center",
          fontFamily: 'CedarvilleCursive-Regular'
        }}
      >
       Brewhub: Your cozy coffee hug!{" "}
      </Text>
      <Text style={{
          color: "white",
          fontSize: 15,
          textAlign:"center",
          
        }}
      >
        Every sip unlocks a new memory.
      </Text>
      <TouchableOpacity onPress={()=>{navigation.navigate("Home")}}>
      <View style ={{
        width:300,
        height:40,
        backgroundColor: "#C67C4E",
        borderRadius:10,
        alignContent:"center",
        justifyContent: "center",
        alignItems : "center"
      }}>
        <Text 
           style={{
          color: "white",
          fontSize: 15,
          fontWeight: "bold",
          textAlign:"center"
        }}> Get Started </Text>
      </View>
      </TouchableOpacity>
      </View>
    </View>
    </View>
  </ImageBackground>
);
};
export default WelcomeScreen;