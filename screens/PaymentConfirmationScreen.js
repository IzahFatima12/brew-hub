import React from 'react';
import { Box, Center, Text } from 'native-base';
import COLORS from '../config/colors';

const PaymentConfirmationScreen = () => {
  return (
    <Box flex={1} bg={COLORS.brown}>
      <Center>
        <Text color={COLORS.Gingerbread} fontSize={24} bold paddingTop={300}>
          Your payment has been confirmed!
        </Text>
      </Center>
    </Box>
  );
};

export default PaymentConfirmationScreen;
