import React from 'react';
import { Box, Center, Text } from 'native-base';
import COLORS from '../config/colors';

const PaymentConfirmationScreen = () => {
  return (
    <Box flex={1} bg={COLORS.brown}>
      <Center>
        <Text color={COLORS.Gingerbread} fontSize={24} bold paddingTop={300}>
          Your order has been confirmed!
          Thankyou for trusting us.
          We'll make sure you return to order our warm coffeess filled with love.
        </Text>
      </Center>
    </Box>
  );
};

export default PaymentConfirmationScreen;
