import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../config/colors';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from "../config/colors";

const MyCartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (route.params?.item) {
      const existingItem = cartItems.find((cartItem) => cartItem.id === route.params.item.id);
      if (!existingItem) {
        setCartItems((prevCartItems) => [...prevCartItems, { ...route.params.item, quantity: 1 }]);
      } else {
        const updatedCartItems = cartItems.map((cartItem) =>
          cartItem.id === existingItem.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCartItems(updatedCartItems);
      }
    }
  }, [route.params?.item]);

  const handleIncrement = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const handleRemove = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.img }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>Price: ${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecrement(item)}>
          <Icon name="remove" size={25} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncrement(item)}>
          <Icon name="add" size={25} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemove(item)}>
          <Icon name="delete" size={25} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0) * (item.quantity || 0),
    0
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      {cartItems.length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      )}
      <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.navigate('Home',)}>
        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
      </TouchableOpacity>
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalPriceText}>Total Price: ${totalPrice.toFixed(2)}</Text>
          <PrimaryButton title="CHECKOUT" onPress={() => navigation.navigate('AddressScreen')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brown,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom:10,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color:COLORS.Gingerbread,
  },
  cartItem: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Gingerbread,
    marginVertical: 5,
    borderRadius: 5,
    padding:20,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.brown, // Add margin bottom for spacing
  },
  itemPrice: {
    fontSize: 15,
    padding: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color:colors.brown,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 5,
  },
  footer: {
    marginTop: 20,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  continueShoppingButton: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  continueShoppingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.Gingerbread,
  },
});

export default MyCartScreen;
