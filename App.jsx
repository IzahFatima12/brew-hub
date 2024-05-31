// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CoffeeDetailsScreen from './screens/CoffeeDetails';
import MyCartScreen from './screens/MyCartScreen';
import PaymentScreen from './screens/paymentScreen';
import LoginScreen from './screens/LoginScreen';
import AddressScreen from './screens/AddressScreen';
import paymentConfirmationScreen from './screens/PaymentConfirmationScreen';
import CR from './assets/fonts/CedarvilleCursive-Regular.ttf';

SplashScreen.preventAutoHideAsync();
const loadFonts = () => {
  return Font.loadAsync({
    'CedarvilleCursive-Regular': CR,
  });
};

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  

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
        <Stack.Screen name="paymentConfirmationScreen" component={paymentConfirmationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => (
              <LoginScreen
                {...props}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                imageUri={imageUri}
                setImageUri={setImageUri}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="payment" component={PaymentScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MyCart" component={MyCartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CoffeeDetails" component={CoffeeDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>


      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
