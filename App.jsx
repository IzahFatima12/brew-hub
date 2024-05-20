

import * as React from 'react';
import { useEffect,useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen'
//import { AppRegistry } from 'react-native';
import CoffeeDetailsScreen from './screens/CoffeeDetails';
import * as Font from 'expo-font';
import  * as SplashScreen from 'expo-splash-screen';
import MyCartScreen from './screens/MyCartScreen';
import PaymentScreen from './screens/paymentScreen';

SplashScreen.preventAutoHideAsync();
const loadFonts = () => {
  return Font.loadAsync({
    'CedarvilleCursive-Regular': require('./assets/fonts/CedarvilleCursive-Regular.ttf'),
  });
};


const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!fontsLoaded) {
    // Returning null while fonts are loading prevents the main UI from rendering
    return null;
  }
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="payment" component={PaymentScreen} options={{
          headerShown: false,

        }}/>
      <Stack.Screen name="MyCart" component={MyCartScreen} options={{
          headerShown: false,

        }}/>
      <Stack.Screen name="CoffeeDetails" component={CoffeeDetailsScreen} options={{
          headerShown: false,

        }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
         }} />
         <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
          headerShown: false,
         }} />
       
        
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;