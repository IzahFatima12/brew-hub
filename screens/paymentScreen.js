import React from "react";
import { Box, Center, ScrollView, Text, VStack, HStack, Spacer, Image } from "native-base";
import COLORS from '../config/colors'; 
import PrimaryButton from "../components/PrimaryButton"; 
import { Ionicons } from "@expo/vector-icons";
import paypalimage from '../assets/images/paypal.jpg';
import discoverimage from '../assets/images/discover.png';
import googlePayimage from '../assets/images/googlepay.png';

const paymentMethods = [
  {
    image: paypalimage,
    alt: "paypal",
    icon: Ionicons,
  },
  {
    image: discoverimage,
    alt: "discover",
    icon: Ionicons, 
  },
  {
    image: googlePayimage,
    alt: "googlepay",
    icon: Ionicons, 
  },
];

function PaymentScreen() {
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
            {paymentMethods.map((i, index) => (
              <HStack
                key={index}
                alignItems="center"
                bg={COLORS.Gingerbread}
                px={3}
                py={1}
                justifyContent="space-between"
                rounded={10}
              >
                <Box>
                  <Image
                    source={i.image}
                    alt={i.alt}
                    resizeMode="contain"
                    w={60}
                    h={50}
                  />
                  <Spacer />
                </Box>
                <i.icon
                  name="checkmark-circle"
                  size={30}
                  color={COLORS.Tawny}
                />
              </HStack>
            ))}
            <PrimaryButton title="Continue" style={{ backgroundColor: COLORS.Gingerbread, marginTop: 20 }} />
            <Text italic textAlign="center" color={COLORS.Gingerbread}>
              Payment method is<Text bold color={COLORS.Gingerbread}> Paypal</Text> by default
            </Text>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default PaymentScreen;
