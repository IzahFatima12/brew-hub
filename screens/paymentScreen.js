import React, { useState } from "react";
import { Box, Center, ScrollView, Text, VStack, Pressable, Image } from "native-base";
import COLORS from '../config/colors'; 
import PrimaryButton from "../components/PrimaryButton"; 
import { Ionicons } from "@expo/vector-icons";
import codImage from '../assets/images/cod.png';
import creditCardImage from '../assets/images/credit-card.png';
import debitCardImage from '../assets/images/debit-card.png';
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

// Define the paymentMethods array
const paymentMethods = [
  {
    id: "cod",
    image: codImage,
    alt: "Cash on Delivery",
    icon: Ionicons,
  },
  {
    id: "creditCard",
    image: creditCardImage,
    alt: "Credit Card",
    icon: Ionicons, 
  },
  {
    id: "debitcard",
    image: debitCardImage,
    alt: "Debit card",
    icon: Ionicons,
  },
];

function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  const handlePaymentConfirmation = () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Please select a payment method.");
      return;
    }

    // Here you can add additional logic for payment confirmation
    navigation.navigate('paymentConfirmationScreen'); // Navigate to PaymentConfirmationScreen
  };

  return (
    <Box flex={1} safeAreaTop bg={COLORS.Gingerbread} py={5}>
      <Center pb={15}>
        <Text color={COLORS.white} fontSize={14} bold>
          PAYMENT METHOD
        </Text>
      </Center>
      <Box h="full" bg={COLORS.brown} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {paymentMethods.map((method, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedPaymentMethod(method.id)}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? COLORS.blue : COLORS.Gingerbread,
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                })}
              >
                <Box>
                  <Image
                    source={method.image}
                    alt={method.alt}
                    resizeMode="contain"
                    w={60}
                    h={50}
                    style={{}} // Example styles
                  />
                  <Text ml={2} color={COLORS.Gingerbread} fontSize={20} bold >{method.alt}</Text> {/* Display payment method title */}
                </Box>
                {selectedPaymentMethod === method.id && (
                  <Ionicons
                    name="checkmark-circle"
                    size={30}
                    color={COLORS.Tawny}
                  />
                )}
              </Pressable>
            ))}
            <PrimaryButton title="Continue" onPress={handlePaymentConfirmation} style={{ backgroundColor: COLORS.Gingerbread, marginTop: 20 }} />
            
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default PaymentScreen;
